import Joi from 'joi';

import { securityPreHandlers } from '../../../shared/application/security-pre-handlers.js';
import { identifiersType } from '../../../shared/domain/types/identifiers-type.js';
import { CampaignParticipationStatuses } from '../../shared/domain/constants.js';
import { campaignDetailController } from './campaign-detail-controller.js';

const campaignParticipationStatuses = Object.values(CampaignParticipationStatuses);

const register = async function (server) {
  server.route([
    {
      method: 'GET',
      path: '/api/campaigns',
      config: {
        auth: false,
        handler: campaignDetailController.getByCode,
        validate: {
          query: Joi.object({
            filter: Joi.object({
              code: Joi.string()
                .regex(/[^a-zA-Z0-9]/, { invert: true })
                .required(),
            }).required(),
          }),
        },
        notes: ['- Récupération de la campagne dont le code est spécifié dans les filtres de la requête'],
        tags: ['api', 'campaign'],
      },
    },
    {
      method: 'GET',
      path: '/api/campaigns/{campaignId}',
      config: {
        pre: [{ method: securityPreHandlers.checkAuthorizationToAccessCampaign }],
        validate: {
          params: Joi.object({
            campaignId: identifiersType.campaignId,
          }),
        },
        handler: campaignDetailController.getById,
        notes: ["- Récupération d'une campagne par son id"],
        tags: ['api', 'campaign'],
      },
    },
    {
      method: 'GET',
      path: '/api/admin/campaigns/{campaignId}',
      config: {
        pre: [
          {
            method: (request, h) =>
              securityPreHandlers.hasAtLeastOneAccessOf([
                securityPreHandlers.checkAdminMemberHasRoleSuperAdmin,
                securityPreHandlers.checkAdminMemberHasRoleCertif,
                securityPreHandlers.checkAdminMemberHasRoleSupport,
                securityPreHandlers.checkAdminMemberHasRoleMetier,
              ])(request, h),
            assign: 'hasAuthorizationToAccessAdminScope',
          },
        ],
        validate: {
          params: Joi.object({
            campaignId: identifiersType.campaignId,
          }),
        },
        handler: campaignDetailController.getCampaignDetails,
        tags: ['api', 'campaign', 'admin'],
        notes: [
          "- **Cette route est restreinte aux utilisateurs authentifiés ayant les droits d'accès**\n" +
            "- Elle permet de récupérer le détail d'une campagne.",
        ],
      },
    },
    {
      method: 'GET',
      path: '/api/organizations/{organizationId}/campaigns',
      config: {
        pre: [{ method: securityPreHandlers.checkUserBelongsToOrganization }],
        validate: {
          params: Joi.object({
            organizationId: identifiersType.organizationId,
          }),
          query: Joi.object({
            page: {
              size: Joi.number().integer().empty(''),
              number: Joi.number().integer().empty(''),
            },
            filter: Joi.object({
              name: Joi.string().empty(''),
              status: Joi.string().empty(''),
              isOwnedByMe: Joi.boolean().empty('').allow(null).optional(),
              ownerName: Joi.string().empty('').allow(null).optional(),
            }).default({}),
          }),
        },
        handler: campaignDetailController.findPaginatedFilteredCampaigns,
        tags: ['api', 'organizations'],
        notes: [
          'Cette route est restreinte aux utilisateurs authentifiés',
          'Elle retourne les campagnes rattachées à l’organisation.',
        ],
      },
    },
    {
      method: 'GET',
      path: '/api/campaigns/{campaignId}/csv-profiles-collection-results',
      config: {
        pre: [{ method: securityPreHandlers.checkAuthorizationToAccessCampaign }],
        validate: {
          params: Joi.object({
            campaignId: identifiersType.campaignId,
          }),
        },
        handler: campaignDetailController.getCsvProfilesCollectionResults,
        notes: [
          "- **Cette route est restreinte via un token dédié passé en paramètre avec l'id de l'utilisateur.**\n" +
            "- Récupération d'un CSV avec les résultats de la campagne de collecte de profils\n" +
            '- L‘utilisateur doit avoir les droits d‘accès à l‘organisation liée à la campagne à créer',
        ],
        tags: ['api', 'campaign'],
      },
    },
    {
      method: 'GET',
      path: '/api/campaigns/{campaignId}/csv-assessment-results',
      config: {
        pre: [{ method: securityPreHandlers.checkAuthorizationToAccessCampaign }],
        validate: {
          params: Joi.object({
            campaignId: identifiersType.campaignId,
          }),
        },
        handler: campaignDetailController.getCsvAssessmentResults,
        notes: [
          "- **Cette route est restreinte via un token dédié passé en paramètre avec l'id de l'utilisateur.**\n" +
            "- Récupération d'un CSV avec les résultats de la campagne d‘évaluation\n" +
            '- L‘utilisateur doit avoir les droits d‘accès à l‘organisation liée à la campagne à créer',
        ],
        tags: ['api', 'campaign'],
      },
    },
    {
      method: 'GET',
      path: '/api/campaigns/{campaignId}/participants-activity',
      config: {
        validate: {
          params: Joi.object({
            campaignId: identifiersType.campaignId,
          }),
          query: Joi.object({
            page: {
              number: Joi.number().integer().empty(''),
              size: Joi.number().integer().empty(''),
            },
            filter: Joi.object({
              divisions: Joi.array().items(Joi.string()),
              status: Joi.string()
                .valid(...campaignParticipationStatuses)
                .empty(''),
              groups: [Joi.string(), Joi.array().items(Joi.string())],
              search: Joi.string().empty(''),
            }).default({}),
          }),
        },
        handler: campaignDetailController.findParticipantsActivity,
        notes: [
          '- **Cette route est restreinte aux utilisateurs authentifiés**\n' +
            "- Récupération des participations d'une campagne par son id",
        ],
        tags: ['api', 'campaign'],
      },
    },
  ]);
};

const name = 'campaigns-detail-api';
export { name, register };
