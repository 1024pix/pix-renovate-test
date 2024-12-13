import * as legalDocumentsApi from '../../../../../src/legal-documents/application/api/legal-documents-api.js';
import { LegalDocumentService } from '../../../../../src/legal-documents/domain/models/LegalDocumentService.js';
import { LegalDocumentType } from '../../../../../src/legal-documents/domain/models/LegalDocumentType.js';
import { databaseBuilder, expect, knex } from '../../../../test-helper.js';

const { TOS } = LegalDocumentType.VALUES;
const { PIX_ORGA } = LegalDocumentService.VALUES;

describe('Integration | Privacy | Application | Api | legal documents', function () {
  describe('#acceptLegalDocumentByUserId', function () {
    it('accepts the latest legal document version by user id ', async function () {
      // given
      const userId = databaseBuilder.factory.buildUser().id;
      const latestDocument = databaseBuilder.factory.buildLegalDocumentVersion({ type: TOS, service: PIX_ORGA });
      await databaseBuilder.commit();

      // when
      await legalDocumentsApi.acceptLegalDocumentByUserId({ userId, type: TOS, service: PIX_ORGA });

      // then
      const userAcceptance = await knex('legal-document-version-user-acceptances')
        .where({ userId })
        .where('legalDocumentVersionId', latestDocument.id)
        .first();

      expect(userAcceptance).to.exist;
    });
  });
});
