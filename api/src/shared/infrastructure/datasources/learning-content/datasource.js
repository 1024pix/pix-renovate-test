import _ from 'lodash';

import { config } from '../../../config.js';
import { LearningContentCache } from '../../caches/old/learning-content-cache.js';
import { child } from '../../utils/logger.js';
import { LearningContentResourceNotFound } from './LearningContentResourceNotFound.js';

const logger = child('learningcontent:datasource:old', { event: 'learningcontent' });

const _DatasourcePrototype = {
  async get(id) {
    const modelObjects = await this.list();
    const foundObject = _.find(modelObjects, { id });

    if (!foundObject) {
      throw new LearningContentResourceNotFound();
    }

    return foundObject;
  },

  async getMany(ids) {
    const modelObjects = await this.list();

    return ids.map((id) => {
      const foundObject = _.find(modelObjects, { id });

      if (!foundObject) {
        throw new LearningContentResourceNotFound();
      }

      return foundObject;
    });
  },

  async list() {
    if (config.featureToggles.useNewLearningContent) {
      logger.warn({ modelName: this.modelName }, 'container should not use old datasource');
    }
    const learningContent = await LearningContentCache.instance.get();
    return learningContent[this.modelName];
  },
};

export function extend(props) {
  const result = Object.assign({}, _DatasourcePrototype, props);
  _.bindAll(result, _.functions(result));
  return result;
}
