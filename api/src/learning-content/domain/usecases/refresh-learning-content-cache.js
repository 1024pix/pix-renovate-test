import { withTransaction } from '../../../shared/domain/DomainTransaction.js';

export const refreshLearningContentCache = withTransaction(
  /** @param {import('./dependencies.js').Dependencies} */
  async function refreshLearningContentCache({
    LearningContentCache,
    frameworkRepository,
    areaRepository,
    competenceRepository,
    thematicRepository,
    tubeRepository,
    challengeRepository,
    skillRepository,
    courseRepository,
    tutorialRepository,
    missionRepository,
  }) {
    const learningContent = await LearningContentCache.instance.reset();

    await frameworkRepository.save(learningContent.frameworks);
    await areaRepository.save(learningContent.areas);
    await competenceRepository.save(learningContent.competences);
    await thematicRepository.save(learningContent.thematics);
    await tubeRepository.save(learningContent.tubes);
    await skillRepository.save(learningContent.skills);
    await challengeRepository.save(learningContent.challenges);
    await courseRepository.save(learningContent.courses);
    await tutorialRepository.save(learningContent.tutorials);
    await missionRepository.save(learningContent.missions);
  },
);
