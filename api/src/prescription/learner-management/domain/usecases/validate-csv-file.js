import { AggregateImportError } from '../errors.js';
import { ImportScoCsvOrganizationLearnersJob } from '../models/ImportScoCsvOrganizationLearnersJob.js';
import { ImportSupOrganizationLearnersJob } from '../models/ImportSupOrganizationLearnersJob.js';

const validateCsvFile = async function ({
  Parser,
  organizationImportId,
  i18n,
  type,
  importSupOrganizationLearnersJobRepository,
  importScoCsvOrganizationLearnersJobRepository,
  organizationImportRepository,
  importStorage,
}) {
  const organizationImport = await organizationImportRepository.get(organizationImportId);
  const errors = [];
  let warningsData;

  try {
    const parser = await importStorage.getParser(
      { Parser, filename: organizationImport.filename },
      organizationImport.organizationId,
      i18n,
    );

    const { warnings } = parser.parse(parser.getFileEncoding());

    warningsData = warnings;

    if (type) {
      if (type === 'FREGATA') {
        await importScoCsvOrganizationLearnersJobRepository.performAsync(
          new ImportScoCsvOrganizationLearnersJob({
            organizationImportId: organizationImport.id,
            locale: i18n.getLocale(),
          }),
        );
      } else {
        await importSupOrganizationLearnersJobRepository.performAsync(
          new ImportSupOrganizationLearnersJob({
            organizationImportId: organizationImport.id,
            type,
            locale: i18n.getLocale(),
          }),
        );
      }
    }
  } catch (error) {
    if (error instanceof AggregateImportError) {
      errors.push(...error.meta);
    } else {
      errors.push(error);
    }

    await importStorage.deleteFile({ filename: organizationImport.filename });

    throw error;
  } finally {
    organizationImport.validate({ errors, warnings: warningsData });
    await organizationImportRepository.save(organizationImport);
  }
};

export { validateCsvFile };
