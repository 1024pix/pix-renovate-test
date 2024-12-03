import jsonapiSerializer from 'jsonapi-serializer';

const { Serializer } = jsonapiSerializer;

const serialize = function (campaignParticipation) {
  return new Serializer('user-participation', {
    attributes: [
      'participantExternalId',
      'status',
      'campaignId',
      'campaignParticipationId',
      'campaignCode',
      'createdAt',
      'sharedAt',
      'deletedAt',
      'organizationLearnerFullName',
    ],
  }).serialize(campaignParticipation);
};

export { serialize };
