import crypto from 'node:crypto';

import { Assessment } from '../../../../../src/shared/domain/models/Assessment.js';
import {
  createServer,
  databaseBuilder,
  expect,
  generateValidRequestAuthorizationHeader,
  sinon,
} from '../../../../test-helper.js';

describe('Acceptance | Controller | GET /api/admin/users/{userId}/participations', function () {
  let server, randomUUIDStub;

  beforeEach(async function () {
    server = await createServer();
    randomUUIDStub = sinon.stub(crypto, 'randomUUID');
    randomUUIDStub.returns('1234');
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return participations', async function () {
    // given
    const user = databaseBuilder.factory.buildUser();
    const campaign = databaseBuilder.factory.buildCampaign();
    const organizationLearner = databaseBuilder.factory.buildOrganizationLearner();
    const campaignParticipation = databaseBuilder.factory.buildCampaignParticipation({
      userId: user.id,
      campaignId: campaign.id,
      organizationLearnerId: organizationLearner.id,
    });
    databaseBuilder.factory.buildAssessment({
      userId: user.id,
      campaignParticipationId: campaignParticipation.id,
      type: Assessment.types.CAMPAIGN,
    });
    const admin = databaseBuilder.factory.buildUser.withRole();
    await databaseBuilder.commit();

    // when
    const response = await server.inject({
      method: 'GET',
      url: `/api/admin/users/${user.id}/participations`,
      headers: { authorization: generateValidRequestAuthorizationHeader(admin.id) },
    });

    // then
    expect(response.statusCode).to.equal(200);
    expect(response.result).to.deep.equal({
      data: [
        {
          id: '1234',
          type: 'user-participations',
          attributes: {
            'campaign-participation-id': campaignParticipation.id,
            'campaign-code': campaign.code,
            'campaign-id': campaign.id,
            'created-at': campaignParticipation.createdAt,
            'deleted-at': null,
            'participant-external-id': campaignParticipation.participantExternalId,
            'shared-at': campaignParticipation.sharedAt,
            status: campaignParticipation.status,
            'organization-learner-full-name': `${organizationLearner.firstName} ${organizationLearner.lastName}`,
          },
        },
      ],
    });
  });
});
