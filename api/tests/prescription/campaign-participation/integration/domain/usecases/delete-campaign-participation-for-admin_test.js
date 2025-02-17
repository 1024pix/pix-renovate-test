import { DomainTransaction } from '../../../../../../lib/infrastructure/DomainTransaction.js';
import * as campaignRepository from '../../../../../../lib/infrastructure/repositories/campaign-repository.js';
import { deleteCampaignParticipationForAdmin } from '../../../../../../src/prescription/campaign-participation/domain/usecases/delete-campaign-participation-for-admin.js';
import * as campaignParticipationRepository from '../../../../../../src/prescription/campaign-participation/infrastructure/repositories/campaign-participation-repository.js';
import { databaseBuilder, expect, knex } from '../../../../../test-helper.js';

describe('Integration | UseCases | delete-campaign-participation-for-admin', function () {
  it('should delete all campaignParticipations', async function () {
    // given
    const adminUserId = databaseBuilder.factory.buildUser().id;
    const campaignId = databaseBuilder.factory.buildCampaign().id;
    const organizationLearnerId = databaseBuilder.factory.buildOrganizationLearner().id;
    databaseBuilder.factory.buildCampaignParticipation({
      isImproved: true,
      organizationLearnerId,
      campaignId,
    });
    const campaignParticipationToDelete = databaseBuilder.factory.buildCampaignParticipation({
      isImproved: false,
      organizationLearnerId,
      campaignId,
    });

    await databaseBuilder.commit();

    // when
    await DomainTransaction.execute(() => {
      return deleteCampaignParticipationForAdmin({
        userId: adminUserId,
        campaignParticipationId: campaignParticipationToDelete.id,
        campaignRepository,
        campaignParticipationRepository,
      });
    });

    // then
    const results = await knex('campaign-participations').where({ organizationLearnerId });

    expect(results).to.have.lengthOf(2);
    results.forEach((campaignParticipaton) => {
      expect(campaignParticipaton.deletedAt).not.to.equal(null);
      expect(campaignParticipaton.deletedBy).to.equal(adminUserId);
    });
  });
});
