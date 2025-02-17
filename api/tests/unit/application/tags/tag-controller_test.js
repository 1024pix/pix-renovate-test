import { tagController } from '../../../../lib/application/tags/tag-controller.js';
import { usecases } from '../../../../lib/domain/usecases/index.js';
import { domainBuilder, expect, hFake, sinon } from '../../../test-helper.js';

describe('Unit | Application | Tags | tag-controller', function () {
  describe('#findAllTags', function () {
    it('should call findAllTags usecase and tag serializer', async function () {
      // given
      const tag1 = domainBuilder.buildTag({ id: 1, name: 'TAG1' });
      const tag2 = domainBuilder.buildTag({ id: 2, name: 'TAG2' });
      const tag3 = domainBuilder.buildTag({ id: 3, name: 'TAG3' });

      const tags = [tag1, tag2, tag3];

      sinon.stub(usecases, 'findAllTags').resolves(tags);
      const tagSerializer = {
        serialize: sinon.stub(),
      };

      // when
      await tagController.findAllTags({}, hFake, { tagSerializer });

      // then
      expect(usecases.findAllTags).to.have.been.calledOnce;
      expect(tagSerializer.serialize).to.have.been.calledWithExactly(tags);
    });
  });
});
