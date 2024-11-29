import { ATTESTATIONS } from '../../../../src/profile/domain/constants.js';
import { REWARD_TYPES } from '../../../../src/quest/domain/constants.js';
import { COMPARISON } from '../../../../src/quest/domain/models/Quest.js';
import { Assessment, CampaignParticipationStatuses } from '../../../../src/shared/domain/models/index.js';
import { temporaryStorage } from '../../../../src/shared/infrastructure/temporary-storage/index.js';
import { AEFE_TAG, FEATURE_ATTESTATIONS_MANAGEMENT_ID, USER_ID_ADMIN_ORGANIZATION } from '../common/constants.js';
import { TARGET_PROFILE_BADGES_STAGES_ID } from './constants.js';

const profileRewardTemporaryStorage = temporaryStorage.withPrefix('profile-rewards:');

const USERS = [
  {
    firstName: 'attestation-success',
    lastName: 'attestation',
    email: 'attestation-success@example.net',
  },
  {
    firstName: 'attestation-success-shared',
    lastName: 'attestation',
    email: 'attestation-success-shared@example.net',
  },
  {
    firstName: 'attestation-failed',
    lastName: 'attestation',
    email: 'attestation-failed@example.net',
  },
  {
    firstName: 'attestation-pending',
    lastName: 'attestation',
    email: 'attestation-pending@example.net',
  },
  {
    firstName: 'attestation-blank',
    lastName: 'attestation',
    email: 'attestation-blank@example.net',
  },
];
const ORGANIZATION = { name: 'attestation', type: 'SCO', isManagingStudents: true };
const CAMPAIGN = [
  { code: 'ATTEST001', multipleSendings: true, name: 'campagne attestation 1' },
  { code: 'ATTEST002', multipleSendings: true, name: 'campagne attestation 2' },
  { code: 'ATTEST003', multipleSendings: true, name: 'campagne attestation 3' },
];

const TARGET_PROFILE_TUBES = [
  [
    {
      id: 'tube2e715GxaaWzNK6',
      level: 2,
    },
    {
      id: 'recs1vdbHxX8X55G9',
      level: 2,
    },
    {
      id: 'reccqGUKgzIOK8f9U',
      level: 2,
    },
    {
      id: 'recBbCIEKgrQi7eb6',
      level: 2,
    },
    {
      id: 'recpe7Y8Wq2D56q6I',
      level: 2,
    },
  ],
  [
    {
      id: 'tube2e715GxaaWzNK6',
      level: 2,
    },
    {
      id: 'recs1vdbHxX8X55G9',
      level: 2,
    },
    {
      id: 'reccqGUKgzIOK8f9U',
      level: 2,
    },
  ],
  [
    {
      id: 'recBbCIEKgrQi7eb6',
      level: 2,
    },
    {
      id: 'recpe7Y8Wq2D56q6I',
      level: 2,
    },
    {
      id: 'recPOjwrHFhM21yGE',
      level: 2,
    },
  ],
];

const CAMPAIGN_SKILLS = [
  ['skill2wQfMYrOHlL6HI', 'skill1QAVccgLO16Rx8', 'skillX5Rpk2rucNfnF', 'skill1aj7jVAKrVgUye', 'reczOCGv8pz976Acl'],
  ['skill2wQfMYrOHlL6HI', 'skill1QAVccgLO16Rx8', 'skillX5Rpk2rucNfnF'],
  ['skill1aj7jVAKrVgUye', 'reczOCGv8pz976Acl', 'skill2mIMdudcltFsaz'],
];

const buildUsers = (databaseBuilder) => USERS.map((user) => databaseBuilder.factory.buildUser.withRawPassword(user));

const buildOrganization = (databaseBuilder) => databaseBuilder.factory.buildOrganization(ORGANIZATION);

const buildOrganizationLearners = (databaseBuilder, organization, users) =>
  users.map((user) =>
    databaseBuilder.factory.buildOrganizationLearner({
      ...user,
      organizationId: organization.id,
    }),
  );

const buildCampaignParticipations = (databaseBuilder, users) =>
  users.map(async ({ user, organizationLearner, status, sharedAt }) => {
    const stages = await databaseBuilder.knex('stages').where({ targetProfileId: TARGET_PROFILE_BADGES_STAGES_ID });
    const stageZero = stages.find((stage) => stage.level === 0 || stage.threshold === 0);

    const { id: participationId } = databaseBuilder.factory.buildCampaignParticipation({
      userId: user.id,
      campaignId: user.campaignId,
      masteryRate: 1,
      organizationLearnerId: organizationLearner.id,
      status,
      sharedAt,
    });
    databaseBuilder.factory.buildAssessment({
      userId: user.id,
      type: Assessment.types.CAMPAIGN,
      campaignParticipationId: participationId,
    });

    databaseBuilder.factory.buildStageAcquisition({
      stageId: stageZero.id,
      userId: user.id,
      campaignParticipationId: participationId,
    });
  });

const buildSixthGradeQuests = (
  databaseBuilder,
  rewardId,
  [firstTargetProfile, secondTargetProfile, thirdTargetProfile],
) => {
  const firstQuestRequirement = [
    {
      type: 'organization',
      data: {
        type: 'SCO',
      },
      comparison: COMPARISON.ALL,
    },
    {
      type: 'organization',
      data: {
        isManagingStudents: true,
        tags: [AEFE_TAG.name],
      },
      comparison: COMPARISON.ONE_OF,
    },
    {
      type: 'campaignParticipations',
      data: {
        targetProfileIds: [firstTargetProfile.id],
      },
      comparison: COMPARISON.ALL,
    },
  ];
  const firstQuestSuccessRequirements = [
    {
      type: 'skill',
      data: {
        ids: CAMPAIGN_SKILLS[0],
        threshold: 50,
      },
    },
  ];

  databaseBuilder.factory.buildQuest({
    rewardType: REWARD_TYPES.ATTESTATION,
    rewardId,
    eligibilityRequirements: firstQuestRequirement,
    successRequirements: firstQuestSuccessRequirements,
  });

  const secondQuestEligibilityRequirements = [
    {
      type: 'organization',
      data: {
        type: 'SCO',
      },
      comparison: COMPARISON.ALL,
    },
    {
      type: 'organization',
      data: {
        isManagingStudents: true,
        tags: [AEFE_TAG.name],
      },
      comparison: COMPARISON.ONE_OF,
    },
    {
      type: 'campaignParticipations',
      data: {
        targetProfileIds: [secondTargetProfile.id, thirdTargetProfile.id],
      },
      comparison: COMPARISON.ALL,
    },
  ];

  const secondQuestSuccessRequirements = [
    {
      type: 'skill',
      data: {
        ids: [CAMPAIGN_SKILLS[1], CAMPAIGN_SKILLS[2]].flat(),
        threshold: 50,
      },
    },
  ];

  databaseBuilder.factory.buildQuest({
    rewardType: REWARD_TYPES.ATTESTATION,
    rewardId,
    eligibilityRequirements: secondQuestEligibilityRequirements,
    successRequirements: secondQuestSuccessRequirements,
  });
};

const buildTargetProfiles = (databaseBuilder, organization) =>
  TARGET_PROFILE_TUBES.map((tubes, index) => {
    const targetProfile = databaseBuilder.factory.buildTargetProfile({
      description: `parcours attestation 6 eme numero ${index + 1}`,
      name: `parcours attestation 6 eme numero ${index + 1}`,
      ownerOrganizationId: organization.id,
    });

    tubes.map(({ tubeId, level }) =>
      databaseBuilder.factory.buildTargetProfileTube({
        targetProfileId: targetProfile.id,
        tubeId,
        level,
      }),
    );

    return targetProfile;
  });

const buildCampaigns = (databaseBuilder, organization, targetProfiles) =>
  targetProfiles.map((targetProfile, index) => {
    const { id: campaignId } = databaseBuilder.factory.buildCampaign({
      ...CAMPAIGN[index],
      targetProfileId: targetProfile.id,
      organizationId: organization.id,
      title: `Attestation 6ème ${index + 1}`,
    });

    CAMPAIGN_SKILLS[index].map((skillId) =>
      databaseBuilder.factory.buildCampaignSkill({
        campaignId,
        skillId,
      }),
    );

    return campaignId;
  });

export const buildQuests = async (databaseBuilder) => {
  // Create USERS
  const [successUser, successSharedUser, failedUser, pendingUser, blankUser] = buildUsers(databaseBuilder);

  // Create organization
  const organization = buildOrganization(databaseBuilder);

  // Add admin-orga@example.net as Admin in organization
  databaseBuilder.factory.buildMembership({
    organizationId: organization.id,
    organizationRole: 'ADMIN',
    userId: USER_ID_ADMIN_ORGANIZATION,
  });

  // Associate attestation feature to organization
  databaseBuilder.factory.buildOrganizationFeature({
    organizationId: organization.id,
    featureId: FEATURE_ATTESTATIONS_MANAGEMENT_ID,
  });

  // Associate tag to organization
  databaseBuilder.factory.buildOrganizationTag({ organizationId: organization.id, tagId: AEFE_TAG.id });

  // Create organizationLearners
  const organizationLearnersData = [
    { userId: successUser.id, division: '6emeA', firstName: 'attestation-success', lastName: 'attestation-success' },
    {
      userId: successSharedUser.id,
      division: '6emeA',
      firstName: 'attestation-success-shared',
      lastName: 'attestation-success-shared',
    },
    { userId: failedUser.id, division: '6emeA', firstName: 'attestation-failed', lastName: 'attestation-failed' },
    { userId: pendingUser.id, division: '6emeB', firstName: 'attestation-pending', lastName: 'attestation-pending' },
    { userId: blankUser.id, division: '6emeB', firstName: 'attestation-blank', lastName: 'attestation-blank' },
  ];

  const [
    successOrganizationLearner,
    successSharedOrganizationLearner,
    failedOrganizationLearner,
    pendingOrganizationLearner,
  ] = buildOrganizationLearners(databaseBuilder, organization, organizationLearnersData);

  // Create target profile

  const targetProfiles = buildTargetProfiles(databaseBuilder, organization);

  // Create campaigns

  const campaigns = buildCampaigns(databaseBuilder, organization, targetProfiles);

  // Create campaignParticipations

  buildCampaignParticipations(databaseBuilder, [
    {
      user: successUser,
      campaignId: campaigns[0].id,
      organizationLearner: successOrganizationLearner,
      sharedAt: null,
      status: CampaignParticipationStatuses.TO_SHARE,
    },
    {
      user: successUser,
      campaignId: campaigns[1].id,
      organizationLearner: successOrganizationLearner,
      sharedAt: null,
      status: CampaignParticipationStatuses.TO_SHARE,
    },
    {
      user: successUser,
      campaignId: campaigns[2].id,
      organizationLearner: successOrganizationLearner,
      sharedAt: null,
      status: CampaignParticipationStatuses.TO_SHARE,
    },
    {
      user: successSharedUser,
      campaignId: campaigns[0].id,
      organizationLearner: successSharedOrganizationLearner,
    },
    {
      user: failedUser,
      campaignId: campaigns[0].id,
      organizationLearner: failedOrganizationLearner,
    },
    {
      user: pendingUser,
      campaignId: campaigns[0].id,
      organizationLearner: pendingOrganizationLearner,
    },
  ]);

  // Create attestation quest
  const { id: rewardId } = databaseBuilder.factory.buildAttestation({
    templateName: 'sixth-grade-attestation-template',
    key: ATTESTATIONS.SIXTH_GRADE,
  });

  // Create quests
  buildSixthGradeQuests(databaseBuilder, rewardId, targetProfiles);

  // Create reward for success user
  databaseBuilder.factory.buildProfileReward({
    userId: successUser.id,
    rewardType: REWARD_TYPES.ATTESTATION,
    rewardId,
  });

  const { id: sharedProfileRewardId } = databaseBuilder.factory.buildProfileReward({
    userId: successSharedUser.id,
    rewardType: REWARD_TYPES.ATTESTATION,
    rewardId,
  });

  // Create link between profile reward and organization
  databaseBuilder.factory.buildOrganizationsProfileRewards({
    organizationId: organization.id,
    profileRewardId: sharedProfileRewardId,
  });

  // Insert job count in temporary storage for pending user
  await profileRewardTemporaryStorage.increment(pendingUser.id);
};
