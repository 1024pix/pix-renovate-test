import { Activity } from '../models/Activity.js';
import { challengeService } from '../services/challenge.js';
import { END_OF_MISSION, getNextActivityInfo } from './get-next-activity-info.js';

export async function initMissionActivity({
  assessmentId,
  lastActivity,
  activityRepository,
  missionAssessmentRepository,
  missionRepository,
  domainTransaction,
}) {
  if (lastActivity?.status === Activity.status.STARTED) {
    return lastActivity;
  }
  const { missionId } = await missionAssessmentRepository.getByAssessmentId(assessmentId, domainTransaction);
  const mission = await missionRepository.get(missionId);

  const activities = await activityRepository.getAllByAssessmentId(assessmentId, domainTransaction);
  const activityInfo = getNextActivityInfo({ activities, stepCount: mission.stepCount });

  if (activityInfo === END_OF_MISSION) {
    return lastActivity;
  }
  const alternativeVersion = challengeService.getAlternativeVersion({
    mission,
    activities,
    activityInfo,
  });

  const activity = new Activity({
    assessmentId,
    level: activityInfo.level,
    status: Activity.status.STARTED,
    stepIndex: activityInfo.stepIndex,
    alternativeVersion,
  });

  return activityRepository.save(activity, domainTransaction);
}
