/**
 * @typedef {import ('../usecases/index.js').OrganizationFeatureRepository} OrganizationFeatureRepository
 */

import { createReadStream } from 'node:fs';

import { CsvColumn } from '../../../../lib/infrastructure/serializers/csv/csv-column.js';
import { getDataBuffer } from '../../../prescription/learner-management/infrastructure/utils/bufferize/get-data-buffer.js';
import { withTransaction } from '../../../shared/domain/DomainTransaction.js';
import { CsvParser } from '../../../shared/infrastructure/serializers/csv/csv-parser.js';
import { FeatureParamsNotProcessable } from '../errors.js';
import { OrganizationFeature } from '../models/OrganizationFeature.js';

const organizationFeatureCsvHeader = {
  columns: [
    new CsvColumn({
      property: 'featureId',
      name: 'Feature ID',
      isRequired: true,
    }),
    new CsvColumn({
      property: 'organizationId',
      name: 'Organization ID',
      isRequired: true,
    }),
    new CsvColumn({
      property: 'params',
      name: 'Params',
      isRequired: false,
    }),
    new CsvColumn({
      property: 'deleteLearner',
      name: 'Delete Learner',
      isRequired: false,
    }),
  ],
};

export const addOrganizationFeatureInBatch = withTransaction(
  /**
   * @param {Object} params - A parameter object.
   * @param {Number} params.userId - user connected performing the action
   * @param {string} params.filePath - path of csv file wich contains organizations and params.
   * @param {OrganizationFeatureRepository} params.organizationFeatureRepository - organizationRepository to use.
   * @param {Object} params.dependencies
   * @returns {Promise<void>}
   */
  async ({ userId, filePath, organizationFeatureRepository, learnersApi }) => {
    const stream = createReadStream(filePath);
    const buffer = await getDataBuffer(stream);

    const csvParser = new CsvParser(buffer, organizationFeatureCsvHeader);
    const csvData = csvParser.parse();
    const data = csvData.map(({ featureId, organizationId, params, deleteLearner }) => {
      try {
        return new OrganizationFeature({ featureId, organizationId, params, deleteLearner });
      } catch (err) {
        throw new FeatureParamsNotProcessable();
      }
    });

    data.forEach(async ({ organizationId, deleteLearner }) => {
      if (deleteLearner) {
        await learnersApi.deleteOrganizationLearnerBeforeImportFeature({ userId, organizationId });
      }
    });

    return organizationFeatureRepository.saveInBatch(data);
  },
);
