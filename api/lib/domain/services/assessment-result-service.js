const moment = require('moment');

const AssessmentResult = require('../../domain/models/AssessmentResult');

const skillService = require('../../domain/services/skills-service');
const assessmentService = require('../../domain/services/assessment-service');

const assessmentRepository = require('../../infrastructure/repositories/assessment-repository');
const assessmentResultRepository = require('../../infrastructure/repositories/assessment-result-repository');
const competenceMarkRepository = require('../../infrastructure/repositories/competence-mark-repository');
const certificationCourseRepository = require('../../infrastructure/repositories/certification-course-repository');

const { NotFoundError, AlreadyRatedAssessmentError } = require('../../domain/errors');

const CERTIFICATION_MAX_LEVEL = 5;

// TODO: Should compute pixScore automatically in AssessmentResult + create an Utils to compute level/status everywhere
function _getAssessmentResultEvaluations(marks, assessmentType) {

  // FIXME Limiter le level à 5 pour les certifications
  // FIXME clarifier avec le PO a quoi correspond le level d'une certification et d'un assessment-result
  //
  // dans le cas d'une certification, l'assessment Result level devrait être à 0 car non utilisé.
  // dans le cas d'une certification, les competenceMarks devraient avoir un niveau limité à 5.

  const pixScore = marks.reduce((totalPixScore, mark) => {
    return totalPixScore + mark.score;
  }, 0);
  let level = Math.floor(pixScore / 8);
  let status = 'validated';
  if (pixScore === 0 && assessmentType === 'CERTIFICATION') {
    status = 'rejected';
    level = -1;
  }
  return { pixScore, level, status };
}

function _validatedDataForAllCompetenceMark(marks) {
  return Promise.all(marks.map((mark) => mark.validate()));
}

function evaluateFromAssessmentId(assessmentId) {

  let assessment;

  return assessmentRepository.get(assessmentId)
    .then((foundAssessment) => {

      assessment = foundAssessment;

      if (!assessment) {
        throw new NotFoundError();
      }

      if (assessment.isCompleted()) {
        throw new AlreadyRatedAssessmentError();
      }

      return Promise.all([
        assessmentService.getSkills(assessment),
        assessmentService.getCompetenceMarks(assessment),
      ]);
    })
    .then(([skills, marks]) => {
      const { pixScore, level, status } = _getAssessmentResultEvaluations(marks, assessment.type);
      const assessmentResult = new AssessmentResult({
        emitter: 'PIX-ALGO',
        commentForJury: 'Computed',
        level: level,
        pixScore: pixScore,
        status,
        assessmentId,
      });
      assessment.setCompleted();

      return Promise.all([
        assessmentResultRepository.save(assessmentResult),
        marks,
        skillService.saveAssessmentSkills(skills),
        assessmentRepository.save(assessment),
      ]);
    })
    .then(([assessmentResult, marks]) => {
      const assessmentResultId = assessmentResult.id;

      const saveMarksPromises = marks.map((mark) => {
        mark.assessmentResultId = assessmentResultId;
        return mark;
      }).map((mark) => {
        /// XXX une certification ne peut pas avoir une compétence en base au dessus de niveau 5
        if (assessment.type === 'CERTIFICATION') {
          mark.level = Math.min(mark.level, CERTIFICATION_MAX_LEVEL);
        }
        return mark;
      }).map((mark) => competenceMarkRepository.save(mark));

      return Promise.all(saveMarksPromises);
    })
    .then(() => {

      if (assessmentService.isCertificationAssessment(assessment)) {
        return certificationCourseRepository.changeCompletionDate(assessment.courseId,
          moment().toISOString());
      }
    });
}

function save(assessmentResult, competenceMarks) {

  return _validatedDataForAllCompetenceMark(competenceMarks)
    .then(() => assessmentResultRepository.save(assessmentResult))
    .then((assessmentResult) => {
      const competenceMarksSaved = competenceMarks.map((competenceMark) => {
        competenceMark.assessmentResultId = assessmentResult.id;
        return competenceMarkRepository.save(competenceMark);
      });
      return Promise.all(competenceMarksSaved);
    });
}

module.exports = {
  save,
  evaluateFromAssessmentId,

};
