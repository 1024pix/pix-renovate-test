import { DomainTransaction } from '../../lib/infrastructure/DomainTransaction.js';
import { removeByOrganizationLearnerIds } from '../../src/prescription/learner-management/infrastructure/repositories/campaign-participation-repository.js';
import { removeByIds } from '../../src/prescription/learner-management/infrastructure/repositories/organization-learner-repository.js';
import { commaSeparatedNumberParser } from '../../src/shared/application/scripts/parsers.js';
import { Script } from '../../src/shared/application/scripts/script.js';
import { ScriptRunner } from '../../src/shared/application/scripts/script-runner.js';
// Définition du script
export class DeleteAndAnonymiseOrgnizationLearnerScript extends Script {
  constructor() {
    super({
      description: 'Deletes organization-learners and anonymise their related data',
      permanent: true,
      options: {
        organizationLearnerIds: {
          type: '<array>number',
          describe: 'a list of comma separated organization learner ids',
          demandOption: true,
          coerce: commaSeparatedNumberParser(),
        },
      },
    });
  }

  async handle({
    options,
    logger,
    campaignParticipationRepository = { removeByOrganizationLearnerIds },
    organizationLearnerRepository = { removeByIds },
  }) {
    const engineeringUserId = process.env.ENGINEERING_USER_ID;

    logger.info(`Anonymise ${options.organizationLearnerIds.length} learners`);
    await DomainTransaction.execute(async () => {
      await campaignParticipationRepository.removeByOrganizationLearnerIds({
        organizationLearnerIds: options.organizationLearnerIds,
        userId: engineeringUserId,
      });

      await organizationLearnerRepository.removeByIds({
        organizationLearnerIds: options.organizationLearnerIds,
        userId: engineeringUserId,
      });

      await anonymizeDeletedOrganizationLearners(options.organizationLearnerIds);

      const participations = await anonymizeDeletedOrganizationLearnersParticipations(options.organizationLearnerIds);

      await detachAssessments(participations.map((participation) => participation.id));
    });
  }
}

async function anonymizeDeletedOrganizationLearners(organizationLearnerIds) {
  const knexConnection = DomainTransaction.getConnection();
  await knexConnection('organization-learners')
    .update({ firstName: '', lastName: '', userId: null, updatedAt: new Date() })
    .whereIn('id', organizationLearnerIds)
    .whereNotNull('deletedAt');
}

async function anonymizeDeletedOrganizationLearnersParticipations(organizationLearnerIds) {
  const knexConnection = DomainTransaction.getConnection();
  return knexConnection('campaign-participations')
    .update({ participantExternalId: null, userId: null })
    .whereIn('organizationLearnerId', organizationLearnerIds)
    .whereNotNull('deletedAt')
    .returning('id');
}
async function detachAssessments(participationIds) {
  const knexConnection = DomainTransaction.getConnection();
  await knexConnection('assessments')
    .update({ campaignParticipationId: null })
    .whereIn('campaignParticipationId', participationIds);
}
// Exécution du script
await ScriptRunner.execute(import.meta.url, DeleteAndAnonymiseOrgnizationLearnerScript);
