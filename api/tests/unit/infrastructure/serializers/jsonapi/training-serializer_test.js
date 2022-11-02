const { expect, domainBuilder } = require('../../../../test-helper');
const serializer = require('../../../../../lib/infrastructure/serializers/jsonapi/training-serializer');

describe('Unit | Serializer | JSONAPI | training-serializer', function () {
  describe('#serialize', function () {
    it('should convert a training model to JSON', function () {
      // given
      const training = domainBuilder.buildTraining();

      const expectedSerializedTraining = {
        data: {
          attributes: {
            title: 'Training 1',
            link: 'https://example.net',
            type: 'webinar',
            duration: {
              hours: 5,
            },
            locale: 'fr-fr',
          },
          id: training.id.toString(),
          type: 'trainings',
        },
      };

      // when
      const json = serializer.serialize(training);

      // then
      expect(json).to.deep.equal(expectedSerializedTraining);
    });
  });

  describe('#deserialize', function () {
    it('should convert JSON API data to Training object', async function () {
      // given
      const jsonTraining = {
        data: {
          type: 'training',
          attributes: {
            title: 'title',
            link: 'https://example.net',
            duration: '6h',
            type: 'webinaire',
            locale: 'fr-fr',
          },
        },
      };

      // when
      const training = await serializer.deserialize(jsonTraining);

      // then
      expect(training).to.deep.equal({
        title: 'title',
        link: 'https://example.net',
        locale: 'fr-fr',
        duration: '6h',
        type: 'webinaire',
      });
    });
  });
});
