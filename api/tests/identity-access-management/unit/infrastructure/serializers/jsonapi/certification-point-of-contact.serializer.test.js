import { CERTIFICATION_FEATURES } from '../../../../../../src/certification/shared/domain/constants.js';
import * as certificationPointOfContactSerializer from '../../../../../../src/identity-access-management/infrastructure/serializers/jsonapi/certification-point-of-contact.serializer.js';
import { config as settings } from '../../../../../../src/shared/config.js';
import { domainBuilder, expect, sinon } from '../../../../../test-helper.js';

describe('Unit | Identity Access Management | Serializer | JSONAPI | certification-point-of-contact-serializer', function () {
  describe('#serialize()', function () {
    it('converts a CertificationPointOfContact model into JSON API data', function () {
      // given
      const habilitation1 = { id: 1, label: 'Certif comp 1', key: 'CERTIF_COMP_1' };
      const habilitation2 = { id: 2, label: 'Certif comp 2', key: 'CERTIF_COMP_2' };
      sinon.stub(settings.features, 'pixCertifScoBlockedAccessDateCollege').value('2022-06-01');
      sinon.stub(settings.features, 'pixCertifScoBlockedAccessDateLycee').value('2022-08-01');

      settings.features.pixCertifScoBlockedAccessDateLycee = '2022-08-01';

      const allowedCertificationCenterAccess1 = domainBuilder.buildAllowedCertificationCenterAccess({
        id: 123,
        name: 'Sunnydale Center',
        externalId: 'BUFFY_SLAYER',
        type: 'PRO',
        isRelatedToManagingStudentsOrganization: false,
        isV3Pilot: false,
        relatedOrganizationTags: [],
        habilitations: [habilitation1, habilitation2],
        features: [CERTIFICATION_FEATURES.CAN_REGISTER_FOR_A_COMPLEMENTARY_CERTIFICATION_ALONE.key],
      });

      const allowedCertificationCenterAccess2 = domainBuilder.buildAllowedCertificationCenterAccess({
        id: 456,
        name: 'Hellmouth',
        externalId: 'SPIKE',
        type: 'SCO',
        isRelatedToManagingStudentsOrganization: true,
        isV3Pilot: false,
        relatedOrganizationTags: ['tag1'],
        habilitations: [],
        features: [],
      });

      const certificationCenterMemberships = [
        {
          id: 1231,
          certificationCenterId: 123,
          userId: 789,
          role: 'ADMIN',
        },
        {
          id: 1232,
          certificationCenterId: 456,
          userId: 789,
          role: 'MEMBER',
        },
      ];

      const certificationPointOfContact = domainBuilder.buildCertificationPointOfContact({
        id: 789,
        firstName: 'Buffy',
        lastName: 'Summers',
        email: 'buffy.summers@example.net',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [allowedCertificationCenterAccess1, allowedCertificationCenterAccess2],
        certificationCenterMemberships,
      });

      // when
      const jsonApi = certificationPointOfContactSerializer.serialize(certificationPointOfContact);

      // then
      expect(jsonApi).to.deep.equal({
        data: {
          id: '789',
          type: 'certification-point-of-contact',
          attributes: {
            'first-name': 'Buffy',
            'last-name': 'Summers',
            email: 'buffy.summers@example.net',
            lang: 'fr',
            'pix-certif-terms-of-service-accepted': true,
          },
          relationships: {
            'allowed-certification-center-accesses': {
              data: [
                {
                  id: '123',
                  type: 'allowed-certification-center-access',
                },
                {
                  id: '456',
                  type: 'allowed-certification-center-access',
                },
              ],
            },
            'certification-center-memberships': {
              data: [
                {
                  id: '1231',
                  type: 'certification-center-membership',
                },
                {
                  id: '1232',
                  type: 'certification-center-membership',
                },
              ],
            },
          },
        },
        included: [
          {
            id: '123',
            type: 'allowed-certification-center-access',
            attributes: {
              name: 'Sunnydale Center',
              'external-id': 'BUFFY_SLAYER',
              type: 'PRO',
              'is-related-to-managing-students-organization': false,
              'is-access-blocked-college': false,
              'is-access-blocked-lycee': false,
              'is-access-blocked-aefe': false,
              'is-access-blocked-agri': false,
              'is-v3-pilot': false,
              'is-complementary-alone-pilot': true,
              'pix-certif-sco-blocked-access-date-college': '2022-06-01',
              'pix-certif-sco-blocked-access-date-lycee': '2022-08-01',
              'related-organization-tags': [],
              habilitations: [habilitation1, habilitation2],
            },
          },
          {
            id: '456',
            type: 'allowed-certification-center-access',
            attributes: {
              name: 'Hellmouth',
              'external-id': 'SPIKE',
              type: 'SCO',
              'is-related-to-managing-students-organization': true,
              'is-access-blocked-college': false,
              'is-access-blocked-lycee': false,
              'is-access-blocked-aefe': false,
              'is-access-blocked-agri': false,
              'is-v3-pilot': false,
              'is-complementary-alone-pilot': false,
              'pix-certif-sco-blocked-access-date-college': '2022-06-01',
              'pix-certif-sco-blocked-access-date-lycee': '2022-08-01',
              'related-organization-tags': ['tag1'],
              habilitations: [],
            },
          },
          {
            id: '1231',
            type: 'certification-center-membership',
            attributes: {
              'certification-center-id': 123,
              'user-id': 789,
              role: 'ADMIN',
            },
          },
          {
            id: '1232',
            type: 'certification-center-membership',
            attributes: {
              'certification-center-id': 456,
              'user-id': 789,
              role: 'MEMBER',
            },
          },
        ],
      });
    });
  });
});
