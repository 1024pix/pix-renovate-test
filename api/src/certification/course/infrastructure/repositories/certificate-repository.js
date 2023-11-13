import _ from 'lodash';
import { knex } from '../../../../../db/knex-database-connection.js';
import {
  CertificationAttestation,
  ResultCompetenceTree,
  CompetenceMark,
  AssessmentResult,
} from '../../../../../lib/domain/models/index.js';
import * as competenceTreeRepository from '../../../../../lib/infrastructure/repositories/competence-tree-repository.js';

const findByDivisionForScoIsManagingStudentsOrganization = async function ({ organizationId, division }) {
  const certificationCourseDTOs = await _selectCertificationAttestations()
    .select({ organizationLearnerId: 'view-active-organization-learners.id' })
    .innerJoin('certification-candidates', function () {
      this.on({ 'certification-candidates.sessionId': 'certification-courses.sessionId' }).andOn({
        'certification-candidates.userId': 'certification-courses.userId',
      });
    })
    .innerJoin(
      'view-active-organization-learners',
      'view-active-organization-learners.id',
      'certification-candidates.organizationLearnerId',
    )
    .innerJoin('organizations', 'organizations.id', 'view-active-organization-learners.organizationId')
    .where({
      'view-active-organization-learners.organizationId': organizationId,
      'view-active-organization-learners.isDisabled': false,
    })
    .whereRaw('LOWER("view-active-organization-learners"."division") = ?', division.toLowerCase())
    .whereRaw('"certification-candidates"."userId" = "certification-courses"."userId"')
    .whereRaw('"certification-candidates"."sessionId" = "certification-courses"."sessionId"')
    .modify(_checkOrganizationIsScoIsManagingStudents)
    .groupBy('view-active-organization-learners.id', 'certification-courses.id', 'sessions.id', 'assessment-results.id')
    .orderBy('certification-courses.createdAt', 'DESC');

  const competenceTree = await competenceTreeRepository.get();

  const mostRecentCertificationsPerOrganizationLearner =
    _filterMostRecentCertificationCoursePerOrganizationLearner(certificationCourseDTOs);
  return _(mostRecentCertificationsPerOrganizationLearner)
    .orderBy(['lastName', 'firstName'], ['asc', 'asc'])
    .map((certificationCourseDTO) => {
      return _toDomainForCertificationAttestation({ certificationCourseDTO, competenceTree, certifiedBadges: [] });
    })
    .value();
};

export { findByDivisionForScoIsManagingStudentsOrganization };

function _selectCertificationAttestations() {
  return _getCertificateQuery()
    .select({
      id: 'certification-courses.id',
      firstName: 'certification-courses.firstName',
      lastName: 'certification-courses.lastName',
      birthdate: 'certification-courses.birthdate',
      birthplace: 'certification-courses.birthplace',
      isPublished: 'certification-courses.isPublished',
      userId: 'certification-courses.userId',
      date: 'certification-courses.createdAt',
      deliveredAt: 'sessions.publishedAt',
      verificationCode: 'certification-courses.verificationCode',
      certificationCenter: 'sessions.certificationCenter',
      maxReachableLevelOnCertificationDate: 'certification-courses.maxReachableLevelOnCertificationDate',
      pixScore: 'assessment-results.pixScore',
      assessmentResultId: 'assessment-results.id',
      competenceMarks: knex.raw(`
        json_agg(
          json_build_object('score', "competence-marks".score, 'level', "competence-marks".level, 'competence_code', "competence-marks"."competence_code")
          ORDER BY "competence-marks"."competence_code" asc
        )`),
    })
    .where('assessment-results.status', AssessmentResult.status.VALIDATED)
    .where('certification-courses.isPublished', true)
    .where('certification-courses.isCancelled', false);
}

function _getCertificateQuery() {
  return knex
    .from('certification-courses')
    .join('sessions', 'sessions.id', 'certification-courses.sessionId')
    .join(
      'certification-courses-last-assessment-results',
      'certification-courses.id',
      'certification-courses-last-assessment-results.certificationCourseId',
    )
    .join(
      'assessment-results',
      'assessment-results.id',
      'certification-courses-last-assessment-results.lastAssessmentResultId',
    )
    .leftJoin('competence-marks', 'competence-marks.assessmentResultId', 'assessment-results.id');
}

function _checkOrganizationIsScoIsManagingStudents(qb) {
  return qb.where('organizations.type', 'SCO').where('organizations.isManagingStudents', true);
}

function _filterMostRecentCertificationCoursePerOrganizationLearner(DTOs) {
  const groupedByOrganizationLearner = _.groupBy(DTOs, 'organizationLearnerId');

  const mostRecent = [];
  for (const certificationsForOneOrganizationLearner of Object.values(groupedByOrganizationLearner)) {
    mostRecent.push(certificationsForOneOrganizationLearner[0]);
  }
  return mostRecent;
}

function _toDomainForCertificationAttestation({ certificationCourseDTO, competenceTree, certifiedBadges }) {
  const competenceMarks = _.compact(certificationCourseDTO.competenceMarks).map(
    (competenceMark) => new CompetenceMark({ ...competenceMark }),
  );

  const resultCompetenceTree = ResultCompetenceTree.generateTreeFromCompetenceMarks({
    competenceTree,
    competenceMarks,
    certificationId: certificationCourseDTO.id,
    assessmentResultId: certificationCourseDTO.assessmentResultId,
  });

  return new CertificationAttestation({
    ...certificationCourseDTO,
    resultCompetenceTree,
    certifiedBadges,
  });
}
