import * as cancellation from './application/cancellation-route.js';
import * as certificationCandidate from './application/certification-candidate-route.js';
import * as sessionSummaries from './application/certification-centers-session-summaries-route.js';
import * as certificationCourse from './application/certification-course-route.js';
import * as certificationDetails from './application/certification-details-route.js';
import * as certificationIssueReport from './application/certification-issue-report-route.js';
import * as certificationOfficer from './application/certification-officer-route.js';
import * as certificationReport from './application/certification-report-route.js';
import * as companionAlert from './application/companion-alert-route.js';
import * as complementaryCertificationCourseResults from './application/complementary-certification-course-results-route.js';
import * as finalize from './application/finalize-route.js';
import * as finalizedSession from './application/finalized-session-route.js';
import * as invigilatorKit from './application/invigilator-kit-route.js';
import * as juryCertification from './application/jury-certification-route.js';
import * as juryCertificationSummaries from './application/jury-certification-summaries-route.js';
import * as juryComment from './application/jury-comment-route.js';
import * as sessionForSupervising from './application/session-for-supervising-route.js';
import * as sessionLiveAlert from './application/session-live-alert-route.js';
import * as sessionPublication from './application/session-publication-route.js';
import * as session from './application/session-route.js';
import * as supervise from './application/supervise-route.js';
import * as unfinalize from './application/unfinalize-route.js';
import * as updateCpfImportStatus from './application/update-cpf-import-status-route.js';

const certificationSessionRoutes = [
  cancellation,
  certificationCourse,
  certificationOfficer,
  certificationReport,
  certificationIssueReport,
  companionAlert,
  complementaryCertificationCourseResults,
  finalize,
  finalizedSession,
  certificationCandidate,
  certificationDetails,
  invigilatorKit,
  juryCertification,
  juryComment,
  juryCertificationSummaries,
  session,
  sessionSummaries,
  sessionForSupervising,
  sessionLiveAlert,
  sessionPublication,
  supervise,
  unfinalize,
  updateCpfImportStatus,
];

export { certificationSessionRoutes };
