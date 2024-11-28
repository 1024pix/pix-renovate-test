import { CampaignTypes } from '../../../shared/domain/constants.js';

const createCampaigns = async function ({
  campaignsToCreate,
  campaignAdministrationRepository,
  campaignCreatorRepository,
  codeGenerator,
  userRepository,
  organizationRepository,
}) {
  const enrichedCampaignsData = [];
  for (const campaign of campaignsToCreate) {
    await _checkIfOwnerIsExistingUser(userRepository, campaign.ownerId);
    await _checkIfOrganizationExists(organizationRepository, campaign.organizationId);

    const generatedCampaignCode = await codeGenerator.generate(campaignAdministrationRepository);
    const campaignCreator = await campaignCreatorRepository.get(campaign.organizationId);

    const campaignToCreate = await campaignCreator.createCampaign({
      ...campaign,
      type: CampaignTypes.ASSESSMENT,
      code: generatedCampaignCode,
    });
    enrichedCampaignsData.push(campaignToCreate);
  }
  return campaignAdministrationRepository.save(enrichedCampaignsData);
};

const _checkIfOwnerIsExistingUser = async function (userRepository, userId) {
  await userRepository.get(userId);
};

const _checkIfOrganizationExists = async function (organizationRepository, organizationId) {
  await organizationRepository.get(organizationId);
};

export { createCampaigns };
