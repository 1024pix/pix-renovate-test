const Joi = require('joi').extend(require('@joi/date'));

const { sendJsonApiError, UnprocessableEntityError, NotFoundError } = require('../http-errors');
const securityPreHandlers = require('../security-pre-handlers');
const organizationLearnerUserAssociationController = require('./organization-learner-user-association-controller');
const identifiersType = require('../../domain/types/identifiers-type');

exports.register = async function (server) {
  server.route([
    {
      method: 'POST',
      path: '/api/schooling-registration-user-associations/student',
      config: {
        handler: organizationLearnerUserAssociationController.reconcileSupOrganizationLearner,
        validate: {
          options: {
            allowUnknown: false,
          },
          payload: Joi.object({
            data: {
              attributes: {
                'student-number': Joi.string().empty(Joi.string().regex(/^\s*$/)).required(),
                'first-name': Joi.string().empty(Joi.string().regex(/^\s*$/)).required(),
                'last-name': Joi.string().empty(Joi.string().regex(/^\s*$/)).required(),
                birthdate: Joi.date().format('YYYY-MM-DD').required(),
                'campaign-code': Joi.string().empty(Joi.string().regex(/^\s*$/)).required(),
              },
              type: 'schooling-registration-user-associations',
            },
          }),
          failAction: (request, h) => {
            return sendJsonApiError(new UnprocessableEntityError('Un des champs saisis n’est pas valide.'), h);
          },
        },
        notes: [
          '- **Cette route est restreinte aux utilisateurs authentifiés**\n' +
            '- Elle réconcilie l’utilisateur à l’inscription d’un étudiant dans cette organisation',
        ],
        tags: ['api', 'organizationLearnerUserAssociation'],
      },
    },
    {
      method: 'PATCH',
      path: '/api/organizations/{id}/schooling-registration-user-associations/{schoolingRegistrationId}',
      config: {
        pre: [
          {
            method: securityPreHandlers.checkUserIsAdminInSUPOrganizationManagingStudents,
          },
        ],
        handler: organizationLearnerUserAssociationController.updateStudentNumber,
        validate: {
          options: {
            allowUnknown: true,
          },
          params: Joi.object({
            id: identifiersType.organizationId,
            schoolingRegistrationId: identifiersType.schoolingRegistrationId,
          }),
          payload: Joi.object({
            data: {
              attributes: {
                'student-number': Joi.string().empty(Joi.string().regex(/^\s*$/)).required(),
              },
            },
          }),
          failAction: (request, h, err) => {
            const isStudentNumber = err.details[0].path.includes('student-number');
            if (isStudentNumber) {
              return sendJsonApiError(new UnprocessableEntityError('Un des champs saisis n’est pas valide.'), h);
            }
            return sendJsonApiError(new NotFoundError('Ressource non trouvée'), h);
          },
        },
        notes: [
          "- **Cette route est restreinte aux utilisateurs authentifiés et admin au sein de l'orga**\n" +
            '- Elle met à jour le numéro étudiant',
        ],
        tags: ['api', 'organizationLearnerUserAssociation'],
      },
    },
  ]);
};

exports.name = 'schooling-registration-user-associations-api';
