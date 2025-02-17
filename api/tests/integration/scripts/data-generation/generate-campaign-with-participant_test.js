import { generateCampaignWithParticipants } from '../../../../scripts/data-generation/generate-campaign-with-participants.js';
import { databaseBuilder, expect, knex, learningContentBuilder, mockLearningContent } from '../../../test-helper.js';

describe('Integration | Scripts | generate-campaign-with-participants', function () {
  it('should create a profiles collection campaign with participants', async function () {
    // given
    await mockLearningContent(learningContentBuilder.fromAreas([]));
    const organizationId = databaseBuilder.factory.buildOrganization().id;
    const userId = databaseBuilder.factory.buildUser({ id: 1 }).id;
    databaseBuilder.factory.buildMembership({ organizationId, organizationRole: 'ADMIN', userId });
    await databaseBuilder.commit();
    // when
    await generateCampaignWithParticipants({
      organizationId,
      participantCount: 2,
      campaignType: 'profiles_collection',
      targetProfileId: null,
    });

    // then
    const participants = await knex('campaign-participations');

    expect(participants).to.have.lengthOf(2);
  });

  it('should create a assessment campaign with participants', async function () {
    // given
    await mockLearningContent(learningContentBuilder.fromAreas([]));
    const organizationId = databaseBuilder.factory.buildOrganization().id;
    const userId = databaseBuilder.factory.buildUser({ id: 1 }).id;
    databaseBuilder.factory.buildMembership({ organizationId, organizationRole: 'ADMIN', userId });
    await databaseBuilder.commit();
    // when
    await generateCampaignWithParticipants({
      organizationId,
      participantCount: 2,
      campaignType: 'assessment',
      targetProfileId: null,
    });

    // then
    const participants = await knex('campaign-participations');

    expect(participants).to.have.lengthOf(2);
  });
});
