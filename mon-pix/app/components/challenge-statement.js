import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import sortBy from 'lodash/sortBy';
import ENV from 'mon-pix/config/environment';

const PREFERRED_ATTACHMENT_FORMATS = ['docx', 'xlsx', 'pptx'];

export default class ChallengeStatement extends Component {
  @service intl;
  @service currentUser;
  @service featureToggles;
  @service router;
  @service metrics;

  @tracked selectedAttachmentUrl;
  @tracked displayAlternativeInstruction = false;
  @tracked isSpeaking = false;
  @tracked textToSpeechButtonTooltipText = this.intl.t('pages.challenge.statement.text-to-speech.play');

  constructor() {
    super(...arguments);
    this._initialiseDefaultAttachment();
    this.stopTextToSpeechOnLeaveOrRefresh();
  }
  get isFocusedChallengeToggleEnabled() {
    return ENV.APP.FT_FOCUS_CHALLENGE_ENABLED;
  }

  get challengeInstruction() {
    const instruction = this.args.challenge.instruction;
    return instruction ? this._formatLink(instruction) : null;
  }

  get linkTitle() {
    return this.intl.t('navigation.external-link-title');
  }

  get challengeEmbedDocument() {
    if (this.args.challenge && this.args.challenge.hasValidEmbedDocument) {
      return {
        url: this.args.challenge.embedUrl,
        title: this.args.challenge.embedTitle,
        height: this.args.challenge.embedHeight,
      };
    }
    return undefined;
  }

  get id() {
    return 'challenge_statement_' + this.args.challenge.id;
  }

  get showTextToSpeechButton() {
    return (
      window.speechSynthesis &&
      !this.args.assessment.isCertification &&
      this.featureToggles.featureToggles?.isTextToSpeechButtonEnabled &&
      this.args.isTextToSpeechActivated
    );
  }

  @action
  toggleAlternativeInstruction() {
    this.displayAlternativeInstruction = !this.displayAlternativeInstruction;
  }

  @action
  chooseAttachmentUrl(attachementUrl) {
    this.selectedAttachmentUrl = attachementUrl;
  }

  @action
  toggleInstructionTextToSpeech() {
    if (this.isSpeaking) {
      speechSynthesis.cancel();
      this.isSpeaking = false;
      this.textToSpeechButtonTooltipText = this.intl.t('pages.challenge.statement.text-to-speech.play');
    } else {
      const element = document.getElementsByClassName('challenge-statement-instruction__text')[0];
      const textToSpeech = new SpeechSynthesisUtterance(element.innerText);
      textToSpeech.lang = this.getTextToSpeechLanguage();
      textToSpeech.pitch = 0.8;
      textToSpeech.rate = 0.8;
      textToSpeech.onend = () => {
        this.isSpeaking = false;
        this.textToSpeechButtonTooltipText = this.intl.t('pages.challenge.statement.text-to-speech.play');
      };
      this.isSpeaking = true;
      this.textToSpeechButtonTooltipText = this.intl.t('pages.challenge.statement.text-to-speech.stop');
      this.textToSpeechButtonIcon = 'circle-stop';
      speechSynthesis.speak(textToSpeech);
    }
    this.addMetrics();
  }

  getTextToSpeechLanguage() {
    if (this.args.challenge.locales.length) {
      return this.args.challenge.locales[0];
    }
    if (this.currentUser.user?.lang) {
      return this.currentUser.user.lang;
    }
    return 'fr';
  }

  addMetrics() {
    this.metrics.add({
      event: 'custom-event',
      'pix-event-category': 'Vocalisation',
      'pix-event-action': "Lecture d'une épreuve",
      'pix-event-name': `Clic sur le bouton de lecture d'épreuve : ${this.isSpeaking ? 'play' : 'stop'}`,
    });
  }

  stopTextToSpeechOnLeaveOrRefresh() {
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
      this.router.on('routeWillChange', () => {
        speechSynthesis.cancel();
      });
    }
  }

  get orderedAttachments() {
    if (!this.args.challenge.attachments || !Array.isArray(this.args.challenge.attachments)) {
      return [];
    }

    return sortBy(this.args.challenge.attachments, (attachmentUrl) => {
      const extension = attachmentUrl.split('.').pop();
      const newFirstChar = PREFERRED_ATTACHMENT_FORMATS.indexOf(extension) >= 0 ? 'A' : 'Z';
      return newFirstChar + extension;
    });
  }

  _initialiseDefaultAttachment() {
    this.selectedAttachmentUrl = this.orderedAttachments[0];
  }

  _formatLink(instruction) {
    const externalLinkRegex = /(\[(.*?)\]\((.*?)\))+/g;
    return instruction.replace(externalLinkRegex, this._insertLinkTitle.bind(this));
  }

  _insertLinkTitle(markdownLink) {
    const markdownLinkWithoutLastChar = markdownLink.substring(0, markdownLink.length - 1);
    const linkDestination = markdownLink.substring(1, markdownLink.indexOf(']'));
    return `${markdownLinkWithoutLastChar} "${linkDestination} (${this.linkTitle})")`;
  }
}
