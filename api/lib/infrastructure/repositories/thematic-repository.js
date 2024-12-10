import { config } from '../../../src/shared/config.js';
import { LOCALE } from '../../../src/shared/domain/constants.js';
import { Thematic } from '../../../src/shared/domain/models/Thematic.js';
import { getTranslatedKey } from '../../../src/shared/domain/services/get-translated-text.js';
import { LearningContentRepository } from '../../../src/shared/infrastructure/repositories/learning-content-repository.js';
import * as oldThematicRepository from './thematic-repository_old.js';

const { FRENCH_FRANCE } = LOCALE;
const TABLE_NAME = 'learningcontent.thematics';

export async function list({ locale = FRENCH_FRANCE } = {}) {
  if (!config.featureToggles.useNewLearningContent) return oldThematicRepository.list({ locale });
  const cacheKey = 'list()';
  const listCallback = (knex) => knex.orderBy('id');
  const thematicDtos = await getInstance().find(cacheKey, listCallback);
  return thematicDtos.map((thematicDto) => toDomain(thematicDto, locale));
}

export async function findByCompetenceIds(competenceIds, locale) {
  if (!config.featureToggles.useNewLearningContent)
    return oldThematicRepository.findByCompetenceIds(competenceIds, locale);
  const cacheKey = `findByCompetenceIds([${competenceIds.sort()}])`;
  const findByCompetenceIdsCallback = (knex) => knex.whereIn('competenceId', competenceIds).orderBy('id');
  const thematicDtos = await getInstance().find(cacheKey, findByCompetenceIdsCallback);
  return thematicDtos.map((thematicDto) => toDomain(thematicDto, locale));
}

export async function findByRecordIds(ids, locale) {
  if (!config.featureToggles.useNewLearningContent) return oldThematicRepository.findByRecordIds(ids, locale);
  const thematicDtos = await getInstance().getMany(ids);
  return thematicDtos
    .filter((thematic) => thematic)
    .map((thematicDto) => toDomain(thematicDto, locale))
    .sort(byLocalizedName(locale));
}

export function clearCache(id) {
  return getInstance().clearCache(id);
}

function byLocalizedName(locale) {
  const collator = new Intl.Collator(locale, { usage: 'sort' });
  return (thematic1, thematic2) => collator.compare(thematic1.name, thematic2.name);
}

function toDomain(thematicDto, locale) {
  const translatedName = getTranslatedKey(thematicDto.name_i18n, locale);
  return new Thematic({
    id: thematicDto.id,
    name: translatedName,
    index: thematicDto.index,
    tubeIds: thematicDto.tubeIds ? [...thematicDto.tubeIds] : null,
    competenceId: thematicDto.competenceId,
  });
}

/** @type {LearningContentRepository} */
let instance;

function getInstance() {
  if (!instance) {
    instance = new LearningContentRepository({ tableName: TABLE_NAME });
  }
  return instance;
}
