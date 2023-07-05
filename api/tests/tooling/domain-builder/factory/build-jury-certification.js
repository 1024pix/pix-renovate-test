import { JuryCertification } from '../../../../lib/domain/models/JuryCertification.js';
import { buildCertificationIssueReport } from './build-certification-issue-report.js';
import { buildCompetenceMark } from './build-competence-mark.js';

const buildJuryCertification = function ({
  certificationCourseId = 123,
  sessionId = 456,
  userId = 789,
  assessmentId = 159,
  firstName = 'Malik',
  lastName = 'Wayne',
  birthplace = 'Torreilles',
  birthdate = '2000-08-30',
  birthINSEECode = '66212',
  birthPostalCode = null,
  birthCountry = 'France',
  sex = 'M',
  status = 'validated',
  isPublished = true,
  isCancelled = false,
  createdAt = new Date('2020-01-01'),
  completedAt = new Date('2020-02-01'),
  pixScore = 55,
  juryId = 66,
  commentForCandidate = 'comment candidate',
  commentForOrganization = 'comment organization',
  commentForJury = 'comment jury',
  competenceMarks = [buildCompetenceMark()],
  certificationIssueReports = [buildCertificationIssueReport()],
  commonComplementaryCertificationCourseResult = null,
  complementaryCertificationCourseResultWithExternal = {},
} = {}) {
  return new JuryCertification({
    certificationCourseId,
    sessionId,
    userId,
    assessmentId,
    firstName,
    lastName,
    birthplace,
    birthdate,
    birthINSEECode,
    birthPostalCode,
    birthCountry,
    sex,
    status,
    isCancelled,
    isPublished,
    createdAt,
    completedAt,
    pixScore,
    juryId,
    commentForCandidate,
    commentForOrganization,
    commentForJury,
    competenceMarks,
    certificationIssueReports,
    commonComplementaryCertificationCourseResult,
    complementaryCertificationCourseResultWithExternal,
  });
};

export { buildJuryCertification };
