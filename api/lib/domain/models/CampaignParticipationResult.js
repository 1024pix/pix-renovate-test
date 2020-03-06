const CompetenceResult = require('./CompetenceResult');
const _ = require('lodash');

class CampaignParticipationResult {
  constructor({
    id,
    // attributes
    areBadgeCriteriaValidated,
    isCompleted,
    masteryPercentage,
    totalSkillsCount,
    testedSkillsCount,
    validatedSkillsCount,
    // relationships
    competenceResults = [],
    badge,
  } = {}) {
    this.id = id;
    // attributes
    this.areBadgeCriteriaValidated = areBadgeCriteriaValidated;
    this.isCompleted = isCompleted;
    this.masteryPercentage = masteryPercentage;
    this.totalSkillsCount = totalSkillsCount;
    this.testedSkillsCount = testedSkillsCount;
    this.validatedSkillsCount = validatedSkillsCount;
    // relationships
    this.competenceResults = competenceResults;
    this.badge = badge;
  }

  static buildFrom({ campaignParticipationId, assessment, competences, targetProfile, knowledgeElements, badge }) {
    const targetProfileSkillsIds = _.map(targetProfile.skills, 'id');
    let targetedCompetences = _removeUntargetedSkillsFromCompetences(competences, targetProfileSkillsIds);
    targetedCompetences = _removeCompetencesWithoutAnyTargetedSkillsLeft(targetedCompetences);
    const targetedKnowledgeElements = _removeUntargetedKnowledgeElements(knowledgeElements, targetProfileSkillsIds);
    const targetedCompetenceResults = _.map(targetedCompetences, (competence) => _getTestedCompetenceResults(competence, targetedKnowledgeElements));

    const validatedSkillsCount = _.sumBy(targetedCompetenceResults, 'validatedSkillsCount');
    const totalSkillsCount = _.sumBy(targetedCompetenceResults, 'totalSkillsCount');
    const testedSkillsCount = _.sumBy(targetedCompetenceResults, 'testedSkillsCount');
    const masteryPercentage = Math.round(validatedSkillsCount * 100 / totalSkillsCount);

    return new CampaignParticipationResult({
      id: campaignParticipationId,
      masteryPercentage,
      totalSkillsCount,
      testedSkillsCount,
      validatedSkillsCount,
      areBadgeCriteriaValidated: false,
      isCompleted: assessment.isCompleted(),
      competenceResults: targetedCompetenceResults,
      badge,
    });
  }
}

function _removeUntargetedKnowledgeElements(knowledgeElements, targetProfileSkillsIds) {
  return _.filter(knowledgeElements, (ke) => targetProfileSkillsIds.some((skillId) => skillId === ke.skillId));
}

function _removeUntargetedSkillsFromCompetences(competences, targetProfileSkillsIds) {
  return _.map(competences, (competence) => {
    competence.skills = _.intersection(competence.skills, targetProfileSkillsIds);
    return competence;
  });
}

function _removeCompetencesWithoutAnyTargetedSkillsLeft(competences) {
  return _.filter(competences, (competence) => !_.isEmpty(competence.skills));
}

function _getTestedCompetenceResults(competence, targetedKnowledgeElements) {
  const targetedKnowledgeElementsForCompetence = _.filter(targetedKnowledgeElements, (ke) => _.includes(competence.skills, ke.skillId));
  const validatedKnowledgeElementsForCompetence = _.filter(targetedKnowledgeElementsForCompetence, 'isValidated');

  return new CompetenceResult({
    id: competence.id,
    name: competence.name,
    index: competence.index,
    areaColor: competence.area.color,
    totalSkillsCount: competence.skills.length,
    testedSkillsCount: targetedKnowledgeElementsForCompetence.length,
    validatedSkillsCount: validatedKnowledgeElementsForCompetence.length,
  });
}

module.exports = CampaignParticipationResult;
