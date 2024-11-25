import PixButton from '@1024pix/pix-ui/components/pix-button';
import PixButtonLink from '@1024pix/pix-ui/components/pix-button-link';
import PixMessage from '@1024pix/pix-ui/components/pix-message';
import PixStars from '@1024pix/pix-ui/components/pix-stars';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

import MarkdownToHtml from '../../../../markdown-to-html';
import AcquiredBadges from './acquired-badges';
import AttestationResult from './attestation-result';
import CustomOrganizationBlock from './custom-organization-block';
import RetryOrResetBlock from './retry-or-reset-block';

export default class EvaluationResultsHero extends Component {
  @service currentUser;
  @service metrics;
  @service router;
  @service store;
  @service tabManager;

  @tracked hasGlobalError = false;
  @tracked isButtonLoading = false;

  get masteryRatePercentage() {
    return Math.round(this.args.campaignParticipationResult.masteryRate * 100);
  }

  get hasStagesStars() {
    return (
      this.args.campaignParticipationResult.hasReachedStage &&
      this.args.campaignParticipationResult.reachedStage.totalStage > 1
    );
  }

  get reachedStage() {
    return {
      acquired: this.args.campaignParticipationResult.reachedStage.reachedStage - 1,
      total: this.args.campaignParticipationResult.reachedStage.totalStage - 1,
    };
  }

  get isSharableCampaign() {
    return !this.args.campaign.isSimplifiedAccess;
  }

  get showCustomOrganizationBlock() {
    const hasCustomContent = this.args.campaign.customResultPageText || this.args.campaign.hasCustomResultPageButton;
    return hasCustomContent && (!this.isSharableCampaign || this.args.campaignParticipationResult.isShared);
  }

  get hasQuestResults() {
    return this.args.questResults && this.args.questResults.length > 0;
  }

  @action
  handleSeeTrainingsClick() {
    this.args.showTrainings();
  }

  @action
  async handleImproveResults() {
    if (this.isButtonLoading) return;

    try {
      this.hasGlobalError = false;
      this.isButtonLoading = true;

      const campaignParticipationResult = this.args.campaignParticipationResult;

      const adapter = this.store.adapterFor('campaign-participation-result');
      await adapter.beginImprovement(campaignParticipationResult.id);

      this.metrics.add({
        event: 'custom-event',
        'pix-event-category': 'Fin de parcours',
        'pix-event-action': 'Amélioration des résultats',
        'pix-event-name': "Clic sur le bouton 'Je retente'",
      });

      this.router.transitionTo('campaigns.entry-point', this.args.campaign.code);
    } catch {
      this.hasGlobalError = true;
    } finally {
      this.isButtonLoading = false;
    }
  }

  @action
  async handleShareResultsClick() {
    if (this.isButtonLoading) return;

    try {
      this.hasGlobalError = false;
      this.isButtonLoading = true;

      const campaignParticipationResult = this.args.campaignParticipationResult;
      const adapter = this.store.adapterFor('campaign-participation-result');

      if (this.hasQuestResults && this.args.questResults[0].obtained) {
        await adapter.shareProfileReward(campaignParticipationResult.id, this.args.questResults[0].profileRewardId);
      }

      await adapter.share(campaignParticipationResult.id);

      campaignParticipationResult.isShared = true;
      campaignParticipationResult.canImprove = false;

      this.metrics.add({
        event: 'custom-event',
        'pix-event-category': 'Fin de parcours',
        'pix-event-action': 'Envoi des résultats',
        'pix-event-name': "Envoi des résultats depuis l'en-tête",
      });
    } catch {
      this.hasGlobalError = true;
    } finally {
      this.isButtonLoading = false;
    }
  }

  @action
  setGlobalError(value) {
    this.hasGlobalError = value;
  }

  @action
  handleBackToHomepageDisplay() {
    this.metrics.add({
      event: 'custom-event',
      'pix-event-category': 'Fin de parcours',
      'pix-event-action': 'Sortie de parcours',
      'pix-event-name': "Affichage du bouton 'Revenir à la page d'accueil'",
    });
  }

  @action
  handleBackToHomepageClick() {
    this.metrics.add({
      event: 'custom-event',
      'pix-event-category': 'Fin de parcours',
      'pix-event-action': 'Sortie de parcours',
      'pix-event-name': "Clic sur le bouton 'Revenir à la page d'accueil'",
    });
  }

  <template>
    <div class="evaluation-results-hero">
      <div class="evaluation-results-hero__results">
        <p class="evaluation-results-hero-results__percent">
          <strong>{{this.masteryRatePercentage}}<span>%</span></strong>
          <span>{{t "pages.skill-review.hero.mastery-rate"}}</span>
        </p>
        {{#if this.hasStagesStars}}
          <PixStars
            class="evaluation-results-hero-results__stars"
            @count={{this.reachedStage.acquired}}
            @total={{this.reachedStage.total}}
            @alt={{t
              "pages.skill-review.stage.starsAcquired"
              acquired=this.reachedStage.acquired
              total=this.reachedStage.total
            }}
            @color="yellow"
          />

          <div class="evaluation-results-hero-results__stars-text" role="presentation">
            {{t
              "pages.skill-review.stage.starsAcquired"
              acquired=this.reachedStage.acquired
              total=this.reachedStage.total
            }}
          </div>
        {{/if}}

        {{#if this.hasQuestResults}}
          <AttestationResult @results={{@questResults}} @onError={{(fn this.setGlobalError true)}} />
        {{/if}}

      </div>
      <div class="evaluation-results-hero__details">
        <h2 class="evaluation-results-hero-details__title">
          {{t "pages.skill-review.hero.bravo" name=this.currentUser.user.firstName}}
        </h2>

        {{#if @campaignParticipationResult.hasReachedStage}}
          <div class="evaluation-results-hero-details__stage-message" data-testid="stage-message">
            <MarkdownToHtml @isInline={{true}} @markdown={{@campaignParticipationResult.reachedStage.message}} />
          </div>
        {{/if}}

        {{#if this.isSharableCampaign}}
          {{#if @campaignParticipationResult.isShared}}
            <PixMessage class="evaluation-results-hero-results__shared-message" @type="success" @withIcon={{true}}>
              {{t "pages.skill-review.hero.shared-message"}}
            </PixMessage>
            {{#if @hasTrainings}}
              <p class="evaluation-results-hero-details__explanations">
                {{t "pages.skill-review.hero.explanations.trainings"}}
              </p>
            {{/if}}
          {{else}}
            <p class="evaluation-results-hero-details__explanations">
              {{t "pages.skill-review.hero.explanations.send-results"}}
            </p>
          {{/if}}
          {{#if @campaignParticipationResult.canImprove}}
            <p class="evaluation-results-hero-details__explanations">
              {{t "pages.skill-review.hero.explanations.improve"}}
            </p>
          {{/if}}
        {{/if}}

        <div class="evaluation-results-hero-details__actions">
          {{#if this.isSharableCampaign}}
            {{#if @campaignParticipationResult.isShared}}
              {{#if @hasTrainings}}
                <PixButton @triggerAction={{this.handleSeeTrainingsClick}} @size="large">
                  {{t "pages.skill-review.hero.see-trainings"}}
                </PixButton>
              {{else}}
                {{#unless @campaign.hasCustomResultPageButton}}
                  {{this.handleBackToHomepageDisplay}}
                  <PixButtonLink @route="authentication.login" @size="large" onclick={{this.handleBackToHomepageClick}}>
                    {{t "navigation.back-to-homepage"}}
                  </PixButtonLink>
                {{/unless}}
              {{/if}}
            {{else}}
              <PixButton
                @triggerAction={{this.handleShareResultsClick}}
                @size="large"
                @isLoading={{this.isButtonLoading}}
              >
                {{t "pages.skill-review.actions.send"}}
              </PixButton>
            {{/if}}
            {{#if @campaignParticipationResult.canImprove}}
              <PixButton
                @variant="tertiary"
                @size="large"
                @triggerAction={{this.handleImproveResults}}
                @isLoading={{this.isButtonLoading}}
              >
                {{t "pages.skill-review.actions.improve"}}
              </PixButton>
            {{/if}}
          {{else}}
            {{#unless @campaign.hasCustomResultPageButton}}
              {{this.handleBackToHomepageDisplay}}
              <PixButtonLink @route="authentication.login" @size="large" onclick={{this.handleBackToHomepageClick}}>
                {{if this.currentUser.user.isAnonymous (t "common.actions.login") (t "navigation.back-to-homepage")}}
              </PixButtonLink>
            {{/unless}}
          {{/if}}

          {{#if this.hasGlobalError}}
            <div class="evaluation-results-hero-results__actions-error">
              <PixMessage @type="error" @withIcon={{true}}>
                {{t "pages.skill-review.error"}}
              </PixMessage>
            </div>
          {{/if}}
        </div>

        {{#if @campaignParticipationResult.acquiredBadges.length}}
          <AcquiredBadges @acquiredBadges={{@campaignParticipationResult.acquiredBadges}} />
        {{/if}}
      </div>

      {{#if this.showCustomOrganizationBlock}}
        <CustomOrganizationBlock
          @campaign={{@campaign}}
          @campaignParticipationResult={{@campaignParticipationResult}}
        />
      {{/if}}

      {{#if @campaignParticipationResult.canRetry}}
        <RetryOrResetBlock @campaign={{@campaign}} @campaignParticipationResult={{@campaignParticipationResult}} />
      {{/if}}
    </div>
  </template>
}
