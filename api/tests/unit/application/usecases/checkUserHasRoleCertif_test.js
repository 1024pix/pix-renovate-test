const { expect, sinon } = require('../../../test-helper');
const useCase = require('../../../../lib/application/usecases/checkUserHasRoleCertif');
const tokenService = require('../../../../lib/domain/services/token-service');
const adminMemberRepository = require('../../../../lib/infrastructure/repositories/admin-member-repository');

describe('Unit | Application | Use Case | checkUserHasRoleCertifUseCase', function () {
  const userId = '1234';

  beforeEach(function () {
    sinon.stub(tokenService, 'extractUserId').resolves(userId);
    sinon.stub(adminMemberRepository, 'get');
  });

  it('should resolve true when the admin member has role certif', async function () {
    // given
    adminMemberRepository.get.resolves({ isCertif: true });

    // when
    const result = await useCase.execute(userId);

    // then
    expect(result).to.be.true;
  });

  it('should resolve false when the admin member does not have role certif', async function () {
    // given
    adminMemberRepository.get.resolves({ isCertif: false });

    // when
    const result = await useCase.execute(userId);

    // then
    expect(result).to.be.false;
  });
});
