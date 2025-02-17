import { findUserCampaignParticipationOverviews } from '../../../../../../src/prescription/campaign-participation/domain/usecases/find-user-campaign-participation-overviews.js';
import { sinon } from '../../../../../test-helper.js';
describe('Unit | UseCase | find-user-campaign-participation-overviews', function () {
  let compareStagesAndAcquiredStages,
    campaignParticipationOverviewRepository,
    stageRepository,
    stageAcquisitionRepository;

  beforeEach(function () {
    compareStagesAndAcquiredStages = {
      compare: sinon.stub().returns([]),
    };
    campaignParticipationOverviewRepository = {
      findByUserIdWithFilters: sinon.stub().resolves({
        campaignParticipationOverviews: [],
        pagination: {},
      }),
    };
    stageRepository = { getByTargetProfileIds: sinon.stub().resolves([]) };
    stageAcquisitionRepository = { getByCampaignParticipations: sinon.stub().resolves([]) };
  });

  context('when states is undefined', function () {
    it('should call findByUserIdWithFilters', async function () {
      // given
      const states = undefined;
      const userId = 1;

      // when
      await findUserCampaignParticipationOverviews({
        userId,
        states,
        compareStagesAndAcquiredStages,
        campaignParticipationOverviewRepository,
        stageRepository,
        stageAcquisitionRepository,
      });

      // then
      sinon.assert.calledWith(campaignParticipationOverviewRepository.findByUserIdWithFilters, {
        page: undefined,
        userId,
        states,
      });
    });
  });

  context('when states is a string', function () {
    it('should call findByUserIdWithFilters with an array of states', async function () {
      // given
      const states = 'ONGOING';
      const userId = 1;
      const page = {};

      // when
      await findUserCampaignParticipationOverviews({
        userId,
        states,
        page,
        compareStagesAndAcquiredStages,
        campaignParticipationOverviewRepository,
        stageRepository,
        stageAcquisitionRepository,
      });

      // then
      sinon.assert.calledWith(campaignParticipationOverviewRepository.findByUserIdWithFilters, {
        page,
        userId,
        states: ['ONGOING'],
      });
    });
  });

  context('when states is an array', function () {
    it('should call findByUserIdWithFilters with an array of states', async function () {
      // given
      const states = ['ONGOING'];
      const userId = 1;
      const page = {};

      // when
      await findUserCampaignParticipationOverviews({
        userId,
        states,
        page,
        compareStagesAndAcquiredStages,
        campaignParticipationOverviewRepository,
        stageRepository,
        stageAcquisitionRepository,
      });

      // then
      sinon.assert.calledWith(campaignParticipationOverviewRepository.findByUserIdWithFilters, {
        page,
        userId,
        states: ['ONGOING'],
      });
    });
  });
});
