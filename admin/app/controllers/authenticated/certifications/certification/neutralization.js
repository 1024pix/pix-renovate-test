import Controller from '@ember/controller';
import { action, set } from '@ember/object';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';

export default class NeutralizationController extends Controller {
  @alias('model') certificationDetails;
  @service pixToast;
  @service accessControl;

  @action
  async neutralize(challengeRecId, questionIndex) {
    try {
      await this.certificationDetails.save({
        adapterOptions: {
          isNeutralizeChallenge: true,
          certificationCourseId: this.certificationDetails.id,
          challengeRecId,
        },
      });
      this._updateModel(challengeRecId, true);
      return this.pixToast.sendSuccessNotification({
        message: `La question n°${questionIndex} a été neutralisée avec succès.`,
      });
    } catch (_) {
      return this.pixToast.sendErrorNotification({
        message: `Une erreur est survenue lors de la neutralisation de la question n°${questionIndex}.`,
      });
    }
  }

  @action
  async deneutralize(challengeRecId, questionIndex) {
    try {
      await this.certificationDetails.save({
        adapterOptions: {
          isDeneutralizeChallenge: true,
          certificationCourseId: this.certificationDetails.id,
          challengeRecId,
        },
      });
      this._updateModel(challengeRecId, false);
      return this.pixToast.sendSuccessNotification({
        message: `La question n°${questionIndex} a été dé-neutralisée avec succès.`,
      });
    } catch (_) {
      return this.pixToast.sendErrorNotification({
        message: `Une erreur est survenue lors de la dé-neutralisation de la question n°${questionIndex}.`,
      });
    }
  }

  _updateModel(challengeRecId, neutralized) {
    const neutralizedChallenge = this.certificationDetails.listChallengesAndAnswers.find((challengeAndAnswer) => {
      return challengeAndAnswer.challengeId === challengeRecId;
    });
    set(neutralizedChallenge, 'isNeutralized', neutralized);
  }
}
