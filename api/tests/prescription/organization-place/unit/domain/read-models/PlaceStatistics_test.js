import { PlacesLot } from '../../../../../../src/prescription/organization-place/domain/read-models/PlacesLot.js';
import { PlaceStatistics } from '../../../../../../src/prescription/organization-place/domain/read-models/PlaceStatistics.js';
import { expect, sinon } from '../../../../../test-helper.js';

describe('Unit | Domain | ReadModels | PlaceStatistics', function () {
  let clock;
  const now = new Date('2021-05-01');

  beforeEach(async function () {
    clock = sinon.useFakeTimers({ now, toFake: ['Date'] });
  });

  afterEach(async function () {
    clock.restore();
  });

  describe('#buildFrom', function () {
    it('builds a PlaceStatistics with an id', function () {
      const organizationId = 1;
      const placeStatistics = PlaceStatistics.buildFrom({
        organizationId,
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(placeStatistics).is.instanceof(PlaceStatistics);
      expect(placeStatistics.id).to.includes(organizationId);
    });
  });

  describe('#id', function () {
    it('should create an id including organizationId', function () {
      const organizationId = 1;
      const placeStatistics = PlaceStatistics.buildFrom({
        organizationId,
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(placeStatistics.id).to.equal(`${organizationId}_place_statistics`);
    });
  });

  describe('#total', function () {
    it('should return 0 when there are no places lots', function () {
      const statistics = new PlaceStatistics({
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(statistics.total).to.equal(0);
    });

    it('should return total when there is a places lot', function () {
      const statistics = new PlaceStatistics({
        placesLots: [
          new PlacesLot({
            id: 1,
            count: 1,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
        ],
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(statistics.total).to.equal(1);
    });

    it('should return total when there are places lots', function () {
      const statistics = new PlaceStatistics({
        placesLots: [
          new PlacesLot({
            id: 1,
            count: 1,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
          new PlacesLot({
            id: 2,
            count: 1,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
        ],
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(statistics.total).to.equal(2);
    });
  });

  describe('#occupied', function () {
    it('should return 0 when there is no participant', function () {
      const statistics = new PlaceStatistics({
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(statistics.occupied).to.equal(0);
    });

    it('should return sum of occupied by participant typology when there are participant', function () {
      const statistics = new PlaceStatistics({
        placeRepartition: { totalUnRegisteredParticipant: 1, totalRegisteredParticipant: 1 },
      });

      expect(statistics.occupied).to.equal(2);
    });
  });

  describe('#available', function () {
    it('should return 0 when there are no place lots', function () {
      const statistics = new PlaceStatistics({
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(statistics.available).to.equal(0);
    });

    it('should return total when there are no participants', function () {
      const statistics = new PlaceStatistics({
        placesLots: [
          new PlacesLot({
            id: 1,
            count: 1,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
        ],
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 0 },
      });

      expect(statistics.available).to.equal(1);
    });

    it('should return total of avalaible places when there are less participant than total places', function () {
      const statistics = new PlaceStatistics({
        placesLots: [
          new PlacesLot({
            id: 1,
            count: 2,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
        ],
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 1 },
      });

      expect(statistics.available).to.equal(1);
    });

    it('should return 0 when there are more participant than total places', function () {
      const statistics = new PlaceStatistics({
        placesLots: [
          {
            id: 1,
            count: 2,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          },
        ],
        placeRepartition: { totalUnRegisteredParticipant: 0, totalRegisteredParticipant: 3 },
      });

      expect(statistics.available).to.equal(0);
    });
  });

  describe('#placesLotsTotal', function () {
    it('should return 0 when there are no active places lots', function () {
      const statistics = new PlaceStatistics();

      expect(statistics.placesLotsTotal).to.equal(0);
    });

    it('should return total when there is a active places lot', function () {
      const statistics = new PlaceStatistics({
        placesLots: [
          new PlacesLot({
            id: 1,
            count: 3,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
        ],
      });

      expect(statistics.placesLotsTotal).to.equal(1);
    });

    it('should return total when there are active places lots', function () {
      const statistics = new PlaceStatistics({
        placesLots: [
          new PlacesLot({
            id: 1,
            count: 1,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
          new PlacesLot({
            id: 2,
            count: 10,
            expirationDate: new Date('2021-05-02'),
            activationDate: new Date('2021-04-01'),
            deletedAt: null,
          }),
          new PlacesLot({
            id: 3,
            count: 10,
            expirationDate: new Date('2020-05-02'),
            activationDate: new Date('2019-04-01'),
            deletedAt: null,
          }),
        ],
      });

      expect(statistics.placesLotsTotal).to.equal(2);
    });
  });
});
