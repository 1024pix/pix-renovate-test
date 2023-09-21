import { DomainTransaction } from '../../../../../lib/infrastructure/DomainTransaction.js';
import lodash from 'lodash';
import { MissingAttributesError, NotFoundError } from '../../../../../lib/domain/errors.js';
import { InvalidBadgeLevelError } from '../errors.js';
import { BadgeToAttach } from '../models/BadgeToAttach.js';
import bluebird from 'bluebird';
import { CONCURRENCY_HEAVY_OPERATIONS } from '../../../../shared/infrastructure/constants.js';
import { logger } from '../../../../../lib/infrastructure/logger.js';

const { isNil, uniq } = lodash;

const attachBadges = async function ({
  complementaryCertificationId,
  userId,
  targetProfileIdToDetach,
  complementaryCertificationBadgesToAttachDTO,
  notifyOrganizations,
  badgeRepository,
  complementaryCertificationForTargetProfileAttachmentRepository,
  complementaryCertificationBadgesRepository,
  organizationRepository,
  mailService,
}) {
  _verifyThatLevelsAreConsistent({
    complementaryCertificationBadgesToAttachDTO,
  });

  await _verifyThatBadgesToAttachExist({
    complementaryCertificationBadgesToAttachDTO,
    badgeRepository,
  });

  const complementaryCertification = await complementaryCertificationForTargetProfileAttachmentRepository.getById({
    complementaryCertificationId,
  });

  if (complementaryCertification.hasExternalJury) {
    if (_isRequiredInformationMissing(complementaryCertificationBadgesToAttachDTO))
      throw new MissingAttributesError(
        'Certificate and temporary certificate messages are required for complementary certification with external jury',
      );
  }

  const complementaryCertificationBadges = complementaryCertificationBadgesToAttachDTO.map((badgeToAttachDTO) => {
    return BadgeToAttach.from({
      ...badgeToAttachDTO,
      complementaryCertificationId,
      userId,
    });
  });

  await DomainTransaction.execute(async (domainTransaction) => {
    const relatedComplementaryCertificationBadgesIds =
      await complementaryCertificationBadgesRepository.getAllIdsByTargetProfileId({
        targetProfileId: targetProfileIdToDetach,
      });

    await _detachExistingComplementaryCertificationBadge({
      complementaryCertificationBadgesRepository,
      relatedComplementaryCertificationBadgesIds,
      domainTransaction,
    });

    await _attachNewComplementaryCertificationBadges({
      complementaryCertificationBadgesRepository,
      complementaryCertificationBadges,
      domainTransaction,
    });
  });

  if (notifyOrganizations) {
    await sendNotification({
      targetProfileIdToDetach,
      complementaryCertificationName: complementaryCertification.label,
      organizationRepository,
      mailService,
    });
  }
};

export { attachBadges };

async function sendNotification({
  targetProfileIdToDetach,
  complementaryCertificationName,
  organizationRepository,
  mailService,
}) {
  const emails =
    await organizationRepository.getOrganizationUserEmailByCampaignTargetProfileId(targetProfileIdToDetach);

  if (emails.length) {
    await bluebird.map(
      emails,
      (email) => {
        try {
          mailService.sendNotificationToOrganizationMembersForTargetProfileDetached({
            complementaryCertificationName,
            email,
          });
        } catch (error) {
          logger.error(
            `Failed to send email to notify organisation user "${email}" of ${complementaryCertificationName}'s target profile change`,
          );
          throw error;
        }
      },
      { concurrency: CONCURRENCY_HEAVY_OPERATIONS },
    );
    logger.info(
      `${emails.length} emails sent to notify organisation users of ${complementaryCertificationName}'s target profile change`,
    );
  }
}

function _isRequiredInformationMissing(complementaryCertificationBadgesToAttachDTO) {
  return complementaryCertificationBadgesToAttachDTO.some(
    (complementaryCertificationBadge) =>
      isNil(complementaryCertificationBadge.certificateMessage) ||
      isNil(complementaryCertificationBadge.temporaryCertificateMessage),
  );
}

async function _attachNewComplementaryCertificationBadges({
  complementaryCertificationBadgesRepository,
  complementaryCertificationBadges,
  domainTransaction,
}) {
  await complementaryCertificationBadgesRepository.attach({
    complementaryCertificationBadges,
    domainTransaction,
  });
}

async function _detachExistingComplementaryCertificationBadge({
  complementaryCertificationBadgesRepository,
  relatedComplementaryCertificationBadgesIds,
  domainTransaction,
}) {
  if (relatedComplementaryCertificationBadgesIds.length === 0) {
    throw new NotFoundError('No badges for this target profile.');
  }

  await complementaryCertificationBadgesRepository.detachByIds({
    complementaryCertificationBadgeIds: relatedComplementaryCertificationBadgesIds,
    domainTransaction,
  });
}

function _compareLevels(level1, level2) {
  return level1 - level2;
}

function _ifLevelIsUniq({ sortedUniqLevels, complementaryCertificationBadgesToAttachDTO }) {
  return sortedUniqLevels.length == complementaryCertificationBadgesToAttachDTO.length;
}

function _isFirstLevelDifferentThanOne(sortedUniqLevels) {
  return sortedUniqLevels[0] !== 1;
}

function _isLastLevelDifferentThanExpectedMaximum({ sortedUniqLevels, complementaryCertificationBadgesToAttachDTO }) {
  return sortedUniqLevels.at(-1) !== complementaryCertificationBadgesToAttachDTO.length;
}

function _verifyThatLevelsAreConsistent({ complementaryCertificationBadgesToAttachDTO }) {
  const extractedLevelsFromBadges =
    complementaryCertificationBadgesToAttachDTO?.map((badge) => badge.level).filter(Number.isInteger) ?? [];
  const sortedUniqLevels = uniq([...extractedLevelsFromBadges]).sort(_compareLevels);
  if (!_ifLevelIsUniq({ sortedUniqLevels, complementaryCertificationBadgesToAttachDTO })) {
    throw new InvalidBadgeLevelError();
  }

  if (_isFirstLevelDifferentThanOne(sortedUniqLevels)) {
    throw new InvalidBadgeLevelError();
  }

  if (_isLastLevelDifferentThanExpectedMaximum({ sortedUniqLevels, complementaryCertificationBadgesToAttachDTO })) {
    throw new InvalidBadgeLevelError();
  }
}

async function _verifyThatBadgesToAttachExist({ complementaryCertificationBadgesToAttachDTO, badgeRepository }) {
  if (complementaryCertificationBadgesToAttachDTO?.length <= 0) {
    throw new NotFoundError("One or several badges don't exist.");
  }

  const ids = complementaryCertificationBadgesToAttachDTO.map((ccBadgeToAttach) => ccBadgeToAttach.badgeId);
  const badges = await badgeRepository.findAllByIds({ ids });

  if (badges?.length !== ids.length) {
    throw new NotFoundError("One or several badges don't exist.");
  }
}
