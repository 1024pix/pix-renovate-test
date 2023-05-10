const tooling = require('../common/tooling');
const {
  CLEA_COMPLEMENTARY_CERTIFICATION_ID,
  PIX_DROIT_COMPLEMENTARY_CERTIFICATION_ID,
  PIX_EDU_1ER_DEGRE_COMPLEMENTARY_CERTIFICATION_ID,
  PIX_EDU_2ND_DEGRE_COMPLEMENTARY_CERTIFICATION_ID,
} = require('../common/common-builder');

const TEAM_CERTIFICATION_OFFSET_ID = 7000;
// IDS
/// USERS
const SCO_CERTIFICATION_MANAGING_STUDENTS_ORGANIZATION_USER_ID = TEAM_CERTIFICATION_OFFSET_ID;
const PRO_ORGANIZATION_USER_ID = TEAM_CERTIFICATION_OFFSET_ID + 3;
const SCO_CERTIFICATION_MANAGING_STUDENTS_CERTIFICATION_CENTER_USER_ID = TEAM_CERTIFICATION_OFFSET_ID + 1;
const PRO_CERTIFICATION_CENTER_USER_ID = TEAM_CERTIFICATION_OFFSET_ID + 2;
/// ORGAS
const SCO_MANAGING_STUDENTS_ORGANIZATION_ID = TEAM_CERTIFICATION_OFFSET_ID;
const PRO_ORGANIZATION_ID = TEAM_CERTIFICATION_OFFSET_ID + 1;
/// CERTIFICATION CENTERS
const SCO_CERTIFICATION_CENTER_ID = TEAM_CERTIFICATION_OFFSET_ID + 1;
const PRO_CERTIFICATION_CENTER_ID = TEAM_CERTIFICATION_OFFSET_ID + 2;
/// EXTERNAL IDS
const CERTIFICATION_SCO_MANAGING_STUDENTS_EXTERNAL_ID = 'CERTIFICATION_SCO_MANAGING_STUDENTS_EXTERNAL_ID';
const PRO_EXTERNAL_ID = 'PRO_EXTERNAL_ID';
// SESSION IDS
const SCO_DRAFT_SESSION_ID = TEAM_CERTIFICATION_OFFSET_ID;
const SCO_PUBLISHED_SESSION_ID = TEAM_CERTIFICATION_OFFSET_ID + 1;

async function teamCertificationDataBuilder({ databaseBuilder }) {
  _createScoOrganization({ databaseBuilder });
  _createScoCertificationCenter({ databaseBuilder });
  _createProOrganization({ databaseBuilder });
  _createProCertificationCenter({ databaseBuilder });
  await databaseBuilder.commit();
  await _createScoSession({ databaseBuilder });
  await _createPublishedScoSession({ databaseBuilder });
}

module.exports = {
  teamCertificationDataBuilder,
};

function _createScoCertificationCenter({ databaseBuilder }) {
  databaseBuilder.factory.buildUser.withRawPassword({
    id: SCO_CERTIFICATION_MANAGING_STUDENTS_CERTIFICATION_CENTER_USER_ID,
    firstName: 'Centre de certif SCO managing student',
    lastName: 'Certification',
    email: 'certif-sco@example.net',
    cgu: true,
    lang: 'fr',
    lastTermsOfServiceValidatedAt: new Date(),
    lastPixOrgaTermsOfServiceValidatedAt: new Date(),
    mustValidateTermsOfService: false,
    pixOrgaTermsOfServiceAccepted: false,
    pixCertifTermsOfServiceAccepted: false,
    hasSeenAssessmentInstructions: false,
    rawPassword: 'pix123',
    shouldChangePassword: false,
  });

  tooling.certificationCenter.createCertificationCenter({
    databaseBuilder,
    certificationCenterId: SCO_CERTIFICATION_CENTER_ID,
    name: 'Centre de certification sco managing students',
    type: 'SCO',
    externalId: CERTIFICATION_SCO_MANAGING_STUDENTS_EXTERNAL_ID,
    createdAt: new Date(),
    updatedAt: new Date(),
    memberIds: [SCO_CERTIFICATION_MANAGING_STUDENTS_CERTIFICATION_CENTER_USER_ID],
    complementaryCertificationIds: [],
  });
}

function _createProCertificationCenter({ databaseBuilder }) {
  databaseBuilder.factory.buildUser.withRawPassword({
    id: PRO_CERTIFICATION_CENTER_USER_ID,
    firstName: 'Centre de certif Pro',
    lastName: 'Certification',
    email: 'certif-pro@example.net',
    cgu: true,
    lang: 'fr',
    lastTermsOfServiceValidatedAt: new Date(),
    lastPixOrgaTermsOfServiceValidatedAt: new Date(),
    mustValidateTermsOfService: false,
    pixOrgaTermsOfServiceAccepted: false,
    pixCertifTermsOfServiceAccepted: false,
    hasSeenAssessmentInstructions: false,
    rawPassword: 'pix123',
    shouldChangePassword: false,
  });

  tooling.certificationCenter.createCertificationCenter({
    databaseBuilder,
    certificationCenterId: PRO_CERTIFICATION_CENTER_ID,
    name: 'Centre de certification pro',
    type: 'PRO',
    externalId: PRO_EXTERNAL_ID,
    createdAt: new Date(),
    updatedAt: new Date(),
    memberIds: [PRO_CERTIFICATION_CENTER_USER_ID],
    complementaryCertificationIds: [
      CLEA_COMPLEMENTARY_CERTIFICATION_ID,
      PIX_DROIT_COMPLEMENTARY_CERTIFICATION_ID,
      PIX_EDU_1ER_DEGRE_COMPLEMENTARY_CERTIFICATION_ID,
      PIX_EDU_2ND_DEGRE_COMPLEMENTARY_CERTIFICATION_ID,
    ],
  });
}

function _createScoOrganization({ databaseBuilder }) {
  databaseBuilder.factory.buildUser.withRawPassword({
    id: SCO_CERTIFICATION_MANAGING_STUDENTS_ORGANIZATION_USER_ID,
    firstName: 'Orga SCO managing Student',
    lastName: 'Certification',
    email: 'orga-sco-managing-students@example.net',
    cgu: true,
    lang: 'fr',
    lastTermsOfServiceValidatedAt: new Date(),
    lastPixOrgaTermsOfServiceValidatedAt: new Date(),
    mustValidateTermsOfService: false,
    pixOrgaTermsOfServiceAccepted: false,
    pixCertifTermsOfServiceAccepted: false,
    hasSeenAssessmentInstructions: false,
    rawPassword: 'pix123',
    shouldChangePassword: false,
  });
  tooling.organization.createOrganization({
    databaseBuilder,
    organizationId: SCO_MANAGING_STUDENTS_ORGANIZATION_ID,
    type: 'SCO',
    name: 'Orga team Certification',
    isManagingStudents: true,
    externalId: CERTIFICATION_SCO_MANAGING_STUDENTS_EXTERNAL_ID,
    adminUserId: SCO_CERTIFICATION_MANAGING_STUDENTS_ORGANIZATION_USER_ID,
    configOrganization: {
      learnerCount: 8,
    },
  });
}

function _createProOrganization({ databaseBuilder }) {
  databaseBuilder.factory.buildUser.withRawPassword({
    id: PRO_ORGANIZATION_USER_ID,
    firstName: 'Orga Pro',
    lastName: 'Certification',
    email: 'orga-pro@example.net',
    cgu: true,
    lang: 'fr',
    lastTermsOfServiceValidatedAt: new Date(),
    lastPixOrgaTermsOfServiceValidatedAt: new Date(),
    mustValidateTermsOfService: false,
    pixOrgaTermsOfServiceAccepted: false,
    pixCertifTermsOfServiceAccepted: false,
    hasSeenAssessmentInstructions: false,
    rawPassword: 'pix123',
    shouldChangePassword: false,
  });
  tooling.organization.createOrganization({
    databaseBuilder,
    organizationId: PRO_ORGANIZATION_ID,
    type: 'PRO',
    name: 'Orga team Certification',
    isManagingStudents: true,
    externalId: PRO_EXTERNAL_ID,
    adminUserId: PRO_ORGANIZATION_USER_ID,
    configOrganization: {
      learnerCount: 8,
    },
  });
}

async function _createScoSession({ databaseBuilder }) {
  await tooling.session.createDraftScoSession({
    databaseBuilder,
    sessionId: SCO_DRAFT_SESSION_ID,
    organizationId: SCO_MANAGING_STUDENTS_ORGANIZATION_ID,
    accessCode: 'SCOS12',
    address: '1 rue Certification sco',
    certificationCenter: 'Centre de certification sco managing students',
    certificationCenterId: SCO_CERTIFICATION_CENTER_ID,
    date: new Date(),
    description: 'une description',
    examiner: 'Un super examinateur',
    room: '42',
    time: '12:00',
    createdAt: new Date(),
    configSession: {
      learnersToRegisterCount: 8,
    },
  });
}

async function _createPublishedScoSession({ databaseBuilder }) {
  tooling.session.createPublishedScoSession({
    databaseBuilder,
    sessionId: SCO_PUBLISHED_SESSION_ID,
    organizationId: SCO_MANAGING_STUDENTS_ORGANIZATION_ID,
    accessCode: 'SCOS34',
    address: '1 rue Certification sco',
    certificationCenter: 'Centre de certification sco managing students',
    certificationCenterId: SCO_CERTIFICATION_CENTER_ID,
    date: new Date(),
    description: 'une description',
    examiner: 'Un super examinateur',
    room: '42',
    time: '12:00',
    examinerGlobalComment: 'Session sans pb',
    hasIncident: false,
    hasJoiningIssue: false,
    createdAt: new Date(),
    finalizedAt: new Date(),
    resultsSentToPrescriberAt: new Date(),
    publishedAt: new Date(),
    assignedCertificationOfficerId: null, // créer quelqu'un
    juryComment: '',
    juryCommentAuthorId: null, // mettre des gens
    juryCommentedAt: new Date(),
    configSession: {
      learnersToRegisterCount: 8,
    },
  });
}
