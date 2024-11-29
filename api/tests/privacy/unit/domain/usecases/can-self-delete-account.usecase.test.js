import { usecases } from '../../../../../src/privacy/domain/usecases/index.js';
import { expect, sinon } from '../../../../test-helper.js';

describe('Unit | Privacy | Domain | UseCase | can-self-delete-account', function () {
  const userId = '123';
  let dependencies;

  beforeEach(function () {
    dependencies = {
      featureToggles: { isSelfAccountDeletionEnabled: false },
      learnersApiRepository: { hasBeenLearner: sinon.stub().resolves(false) },
      candidatesApiRepository: { hasBeenCandidate: sinon.stub().resolves(false) },
      userTeamsApiRepository: {
        getUserTeamsInfo: sinon.stub().resolves({
          isPixAgent: false,
          isOrganizationMember: false,
          isCertificationCenterMember: false,
        }),
      },
    };
  });

  context('When feature flag is enabled', function () {
    beforeEach(function () {
      sinon.stub(dependencies.featureToggles, 'isSelfAccountDeletionEnabled').value(true);
    });

    context('When user is eligible', function () {
      it('returns true', async function () {
        // when
        const result = await usecases.canSelfDeleteAccount({ userId, ...dependencies });

        // then
        expect(result).to.be.true;
      });
    });

    context('When user has been a learner', function () {
      it('returns false', async function () {
        // given
        dependencies.learnersApiRepository.hasBeenLearner.withArgs({ userId }).resolves(true);

        // when
        const result = await usecases.canSelfDeleteAccount({ userId, ...dependencies });

        // then
        expect(result).to.be.false;
      });
    });

    context('User has been a candidate to certification', function () {
      it('returns false', async function () {
        // given
        dependencies.candidatesApiRepository.hasBeenCandidate.withArgs({ userId }).resolves(true);

        // when
        const result = await usecases.canSelfDeleteAccount({ userId, ...dependencies });

        // then
        expect(result).to.be.false;
      });
    });

    context('User if user is a Pix agent', function () {
      it('returns false', async function () {
        // given
        dependencies.userTeamsApiRepository.getUserTeamsInfo.withArgs({ userId }).resolves({
          isPixAgent: true,
          isOrganizationMember: false,
          isCertificationCenterMember: false,
        });

        // when
        const result = await usecases.canSelfDeleteAccount({ userId, ...dependencies });

        // then
        expect(result).to.be.false;
      });
    });

    context('User if user is member of an organization', function () {
      it('returns false', async function () {
        // given
        dependencies.userTeamsApiRepository.getUserTeamsInfo.withArgs({ userId }).resolves({
          isPixAgent: false,
          isOrganizationMember: true,
          isCertificationCenterMember: false,
        });

        // when
        const result = await usecases.canSelfDeleteAccount({ userId, ...dependencies });

        // then
        expect(result).to.be.false;
      });
    });

    context('User if user is member of a certification center', function () {
      it('returns false', async function () {
        // given
        dependencies.userTeamsApiRepository.getUserTeamsInfo.withArgs({ userId }).resolves({
          isPixAgent: false,
          isOrganizationMember: false,
          isCertificationCenterMember: true,
        });

        // when
        const result = await usecases.canSelfDeleteAccount({ userId, ...dependencies });

        // then
        expect(result).to.be.false;
      });
    });
  });

  context('Feature flag is disabled', function () {
    context('When user is eligible', function () {
      it('returns false', async function () {
        // given
        sinon.stub(dependencies.featureToggles, 'isSelfAccountDeletionEnabled').value(false);

        // when
        const result = await usecases.canSelfDeleteAccount({ userId: '123', ...dependencies });

        // then
        expect(result).to.be.false;
      });
    });
  });
});
