import { domainBuilder, expect } from '../../../../test-helper.js';
import * as serializer from '../../../../../lib/infrastructure/serializers/jsonapi/complementary-certification-serializer.js';

describe('Unit | Serializer | JSONAPI | complementary-certification-serializer', function () {
  describe('#serialize', function () {
    it('should convert a ComplementaryCertification model object into JSON API data', function () {
      // given
      const complementaryCertifications = [
        domainBuilder.buildComplementaryCertification({
          id: 11,
          label: 'Pix+Edu',
          key: 'EDU',
        }),
        domainBuilder.buildComplementaryCertification({
          id: 22,
          label: 'Cléa Numérique',
          key: 'CLEA',
        }),
      ];

      // when
      const json = serializer.serialize(complementaryCertifications);

      // then
      expect(json).to.deep.equal({
        data: [
          {
            id: '11',
            type: 'complementary-certifications',
            attributes: {
              label: 'Pix+Edu',
              key: 'EDU',
            },
          },
          {
            id: '22',
            type: 'complementary-certifications',
            attributes: {
              label: 'Cléa Numérique',
              key: 'CLEA',
            },
          },
        ],
      });
    });
  });

  describe('#serializeForAdmin', function () {
    it('should convert a ComplementaryCertification model object into JSON API data', function () {
      // given
      const complementaryCertifications = domainBuilder.buildComplementaryCertificationForAdmin({
        id: 11,
        label: 'Pix+Edu',
        key: 'EDU',
        currentTargetProfile: { id: 999, name: 'Target' },
      });

      // when
      const json = serializer.serializeForAdmin(complementaryCertifications);

      // then
      expect(json).to.deep.equal({
        data: {
          attributes: {
            'current-target-profile': {
              id: 999,
              name: 'Target',
            },
            key: 'EDU',
            label: 'Pix+Edu',
          },
          id: '11',
          type: 'complementary-certifications',
        },
      });
    });
  });
});
