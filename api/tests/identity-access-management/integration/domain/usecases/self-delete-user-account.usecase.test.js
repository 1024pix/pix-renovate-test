import { usecases } from '../../../../../src/identity-access-management/domain/usecases/index.js';
import { config } from '../../../../../src/shared/config.js';
import { ForbiddenAccess } from '../../../../../src/shared/domain/errors.js';
import { databaseBuilder, expect, sinon } from '../../../../test-helper.js';

describe('Integration | Identity Access Management | Domain | UseCase | self-delete-user-account', function () {
  context('when user can self delete their account', function () {
    context('when user has an email', function () {
      it('doesn’t throw ForbiddenError and creates a SendEmailJob', async function () {
        // given
        const userId = databaseBuilder.factory.buildUser().id;
        await databaseBuilder.commit();

        sinon.stub(config.featureToggles, 'isSelfAccountDeletionEnabled').value(true);

        // when & then
        await expect(usecases.selfDeleteUserAccount({ userId })).to.not.be.rejectedWith(ForbiddenAccess);

        await expect('SendEmailJob').to.have.been.performed.withJobsCount(1);
      });
    });

    context('when user doesn’t have an email', function () {
      it('doesn’t throw ForbiddenError and doesn’t create a SendEmailJob', async function () {
        // given
        const userId = databaseBuilder.factory.buildUser.withoutPixAuthenticationMethod().id;
        await databaseBuilder.commit();

        sinon.stub(config.featureToggles, 'isSelfAccountDeletionEnabled').value(true);

        // when & then
        await expect(usecases.selfDeleteUserAccount({ userId })).to.not.be.rejectedWith(ForbiddenAccess);

        await expect('SendEmailJob').to.have.been.performed.withJobsCount(0);
      });
    });
  });

  context('when user cannot self delete their account', function () {
    it('throws ForbiddenError', async function () {
      // given
      const userId = databaseBuilder.factory.buildUser().id;
      await databaseBuilder.commit();

      sinon.stub(config.featureToggles, 'isSelfAccountDeletionEnabled').value(false);

      // when & then
      await expect(usecases.selfDeleteUserAccount({ userId })).to.be.rejectedWith(ForbiddenAccess);
    });
  });
});
