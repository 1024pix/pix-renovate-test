import { databaseBuffer } from '../../database-buffer.js';

export function buildChallenge({
  id = 'challengeIdA',
  instruction = 'instruction Epreuve A',
  alternativeInstruction = 'alternativeInstruction Epreuve A',
  proposals = 'proposals Epreuve A',
  type = 'QCU',
  solution = 'solution Epreuve A',
  solutionToDisplay = 'solutionToDisplay Epreuve A',
  t1Status = true,
  t2Status = true,
  t3Status = true,
  status = 'archivé',
  genealogy = 'genealogy Epreuve A',
  accessibility1 = 'accessibility1 Epreuve A',
  accessibility2 = 'accessibility2 Epreuve B',
  requireGafamWebsiteAccess = true,
  isIncompatibleIpadCertif = true,
  deafAndHardOfHearing = 'deafAndHardOfHearing Epreuve A',
  isAwarenessChallenge = true,
  toRephrase = true,
  alternativeVersion = 8,
  shuffled = true,
  illustrationAlt = 'illustrationAlt Epreuve A',
  illustrationUrl = 'illustrationUrl Epreuve A',
  attachments = ['attachment1', 'attachment2'],
  responsive = 'responsive Epreuve A',
  alpha = 1.1,
  delta = 3.3,
  autoReply = true,
  focusable = true,
  format = 'format Epreuve A',
  timer = 180,
  embedHeight = 800,
  embedUrl = 'embedUrl Epreuve A',
  embedTitle = 'embedTitle Epreuve A',
  locales = ['fr'],
  competenceId = null,
  skillId = null,
} = {}) {
  const values = {
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
  return databaseBuffer.pushInsertable({
    tableName: 'learningcontent.challenges',
    values,
  });
}
