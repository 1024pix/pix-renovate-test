import { clearCache } from '../../../shared/infrastructure/repositories/challenge-repository.js';
import { LearningContentRepository } from './learning-content-repository.js';

class ChallengeRepository extends LearningContentRepository {
  constructor() {
    super({
      tableName: 'learningcontent.challenges',
      chunkSize: 500,
    });
  }

  toDto({
    id,
    instruction,
    alternativeInstruction,
    proposals,
    type,
    solution,
    solutionToDisplay,
    t1Status,
    t2Status,
    t3Status,
    status,
    genealogy,
    accessibility1,
    accessibility2,
    requireGafamWebsiteAccess,
    isIncompatibleIpadCertif,
    deafAndHardOfHearing,
    isAwarenessChallenge,
    toRephrase,
    alternativeVersion,
    shuffled,
    illustrationAlt,
    illustrationUrl,
    attachments,
    responsive,
    alpha,
    delta,
    autoReply,
    focusable,
    format,
    timer,
    embedHeight,
    embedUrl,
    embedTitle,
    locales,
    competenceId,
    skillId,
  }) {
    return {
      id,
      instruction,
      alternativeInstruction,
      proposals,
      type,
      solution,
      solutionToDisplay,
      t1Status,
      t2Status,
      t3Status,
      status,
      genealogy,
      accessibility1,
      accessibility2,
      requireGafamWebsiteAccess,
      isIncompatibleIpadCertif,
      deafAndHardOfHearing,
      isAwarenessChallenge,
      toRephrase,
      alternativeVersion,
      shuffled,
      illustrationAlt,
      illustrationUrl,
      attachments,
      responsive,
      alpha,
      delta,
      autoReply,
      focusable,
      format,
      timer,
      embedHeight,
      embedUrl,
      embedTitle,
      locales,
      competenceId,
      skillId,
    };
  }

  clearCache(id) {
    clearCache(id);
  }
}

export const challengeRepository = new ChallengeRepository();
