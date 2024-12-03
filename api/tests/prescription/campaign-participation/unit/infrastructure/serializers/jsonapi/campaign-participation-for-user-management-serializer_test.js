import * as serializer from '../../../../../../../src/prescription/campaign-participation/infrastructure/serializers/jsonapi/campaign-participation-for-user-management-serializer.js';
import { domainBuilder, expect } from '../../../../../../test-helper.js';

describe('Unit | Serializer | JSONAPI | campaign-participation-for-user-management-serializer', function () {
  describe('#serialize()', function () {
    it('should convert a participation model object into JSON API data', function () {
      // given
      const participationForUserManagement = domainBuilder.buildCampaignParticipationForUserManagement({
        id: 123,
        campaignParticipationId: 333,
        status: 'SHARED',
        campaignId: 456,
        campaignCode: 'AZERTY123',
        createdAt: new Date('2020-10-10'),
        sharedAt: new Date('2020-10-11'),
        updatedAt: new Date('2020-10-12'),
        organizationLearnerFirstName: 'Some',
        organizationLearnerLastName: 'Learner',
      });

      // when
      const json = serializer.serialize([participationForUserManagement]);

      // then
      expect(json).to.deep.equal({
        data: [
          {
            type: 'user-participations',
            id: participationForUserManagement.id.toString(),
            attributes: {
              'participant-external-id': participationForUserManagement.participantExternalId,
              status: participationForUserManagement.status,
              'campaign-id': participationForUserManagement.campaignId,
              'campaign-code': participationForUserManagement.campaignCode,
              'campaign-participation-id': participationForUserManagement.campaignParticipationId,
              'created-at': participationForUserManagement.createdAt,
              'shared-at': participationForUserManagement.sharedAt,
              'deleted-at': participationForUserManagement.deletedAt,
              'organization-learner-full-name': participationForUserManagement.organizationLearnerFullName,
            },
          },
        ],
      });
    });
  });
});
