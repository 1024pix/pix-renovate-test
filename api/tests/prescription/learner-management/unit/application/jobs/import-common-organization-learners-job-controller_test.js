import { ImportCommonOrganizationLearnersJobController } from '../../../../../../src/prescription/learner-management/application/jobs/import-common-organization-learners-job-controller.js';
import { usecases } from '../../../../../../src/prescription/learner-management/domain/usecases/index.js';
import { config } from '../../../../../../src/shared/config.js';
import { OrganizationLearnersCouldNotBeSavedError } from '../../../../../../src/shared/domain/errors.js';
import { catchErr, expect, sinon } from '../../../../../test-helper.js';

describe('Unit | Prescription | Application | Jobs | importOrganizationLearnersJobController', function () {
  describe('#isJobEnabled', function () {
    it('return true when job is enabled', function () {
      //given
      sinon.stub(config.pgBoss, 'importFileJobEnabled').value(true);

      // when
      const handler = new ImportCommonOrganizationLearnersJobController();

      // then
      expect(handler.isJobEnabled).to.be.true;
    });

    it('return false when job is disabled', function () {
      //given
      sinon.stub(config.pgBoss, 'importFileJobEnabled').value(false);

      //when
      const handler = new ImportCommonOrganizationLearnersJobController();

      //then
      expect(handler.isJobEnabled).to.be.false;
    });
  });

  describe('#handle', function () {
    it('should call usecase', async function () {
      sinon.stub(usecases, 'saveOrganizationLearnersFile');

      // given
      const handler = new ImportCommonOrganizationLearnersJobController();
      const data = { organizationImportId: Symbol('organizationImportId') };

      // when
      await handler.handle({ data });

      // then
      expect(usecases.saveOrganizationLearnersFile).to.have.been.calledOnce;
      expect(usecases.saveOrganizationLearnersFile).to.have.been.calledWithExactly(data);
    });

    it('should not throw when error is from domain', async function () {
      const error = new OrganizationLearnersCouldNotBeSavedError();
      sinon.stub(usecases, 'saveOrganizationLearnersFile').rejects(error);

      // given
      const errorStub = sinon.stub();
      const handler = new ImportCommonOrganizationLearnersJobController({ logger: { error: errorStub } });
      const data = { organizationImportId: Symbol('organizationImportId') };

      // when & then
      await handler.handle({ data });

      expect(errorStub).to.have.been.calledWithExactly(error);
    });

    it('should throw when error is not from domain', async function () {
      const error = new Error();
      sinon.stub(usecases, 'saveOrganizationLearnersFile').rejects(error);

      // given
      const handler = new ImportCommonOrganizationLearnersJobController();
      const data = { organizationImportId: Symbol('organizationImportId') };

      // when
      const result = await catchErr(handler.handle)({ data });

      // then
      expect(result).to.equal(error);
    });
  });
});
