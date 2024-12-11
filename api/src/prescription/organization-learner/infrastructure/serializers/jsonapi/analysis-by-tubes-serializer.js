import { randomUUID } from 'node:crypto';

import jsonapiSerializer from 'jsonapi-serializer';

const { Serializer } = jsonapiSerializer;

const serialize = function (analysisByTubes) {
  return new Serializer('analysis-by-tubes', {
    transform(analysisByTubes) {
      return {
        id: randomUUID(),
        ...analysisByTubes,
      };
    },
    attributes: ['data'],
  }).serialize(analysisByTubes);
};

export { serialize };
