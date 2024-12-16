import * as campaignRepository from '../../../../../lib/infrastructure/repositories/campaign-repository.js';
import * as knowledgeElementRepository from '../../../../../lib/infrastructure/repositories/knowledge-element-repository.js';
import { CampaignParticipationResult } from '../../../../shared/domain/models/CampaignParticipationResult.js';
import * as areaRepository from '../../../../shared/infrastructure/repositories/area-repository.js';
import * as assessmentRepository from '../../../../shared/infrastructure/repositories/assessment-repository.js';
import * as competenceRepository from '../../../../shared/infrastructure/repositories/competence-repository.js';
import * as campaignParticipationRepository from './campaign-participation-repository.js';

const campaignParticipationResultRepository = {
  async getByParticipationId(campaignParticipationId) {
    const campaignParticipation = await campaignParticipationRepository.get(campaignParticipationId);

    const [skillIds, competences, assessment, snapshots] = await Promise.all([
      campaignRepository.findSkillIds({ campaignId: campaignParticipation.campaignId }),
      competenceRepository.list(),
      assessmentRepository.get(campaignParticipation.lastAssessment.id),
      knowledgeElementRepository.findSnapshotForUsers({
        [campaignParticipation.userId]: campaignParticipation.sharedAt,
      }),
    ]);
    const allAreas = await areaRepository.list();

    return CampaignParticipationResult.buildFrom({
      campaignParticipationId,
      assessment,
      competences,
      skillIds,
      knowledgeElements: snapshots[campaignParticipation.userId],
      allAreas,
    });
  },
};

export { campaignParticipationResultRepository };
