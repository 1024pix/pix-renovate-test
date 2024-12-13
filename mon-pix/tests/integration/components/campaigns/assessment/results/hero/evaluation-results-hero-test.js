import { render } from '@1024pix/ember-testing-library';
import { click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import sinon from 'sinon';

import { stubCurrentUserService } from '../../../../../../helpers/service-stubs';
import setupIntlRenderingTest from '../../../../../../helpers/setup-intl-rendering';

module('Integration | Components | Campaigns | Assessment | Results | Evaluation Results Hero', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('global behaviour', function (hooks) {
    let screen;

    hooks.beforeEach(async function () {
      // given
      stubCurrentUserService(this.owner, { firstName: 'Hermione' });

      this.set('campaign', { organizationId: 1 });
      this.set('campaignParticipationResult', { masteryRate: 0.755 });

      // when
      screen = await render(
        hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
      );
    });

    test('it should display a congratulation title', async function (assert) {
      // then
      const title = screen.getByRole('heading', {
        name: t('pages.skill-review.hero.bravo', { name: 'Hermione' }),
      });
      assert.dom(title).exists();
    });

    test('it should display a rounded mastery rate', async function (assert) {
      // then
      const masteryRateElement = screen.getByText('76');
      assert.strictEqual(masteryRateElement.textContent, '76%');

      assert.dom(screen.getByText(t('pages.skill-review.hero.mastery-rate'))).exists();
    });
  });

  module('results sharing', function () {
    module('when results are not shared', function () {
      test('it should display specific explanation and button', async function (assert) {
        // given
        this.set('campaign', {
          customResultPageText: 'My custom result page text',
          organizationId: 1,
        });

        this.set('campaignParticipationResult', {
          campaignParticipationBadges: [],
          isShared: false,
          canImprove: false,
          masteryRate: 0.75,
          reachedStage: { acquired: 4, total: 5 },
        });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
        );

        // then
        assert.dom(screen.getByText(t('pages.skill-review.hero.explanations.send-results'))).exists();
        assert.dom(screen.getByRole('button', { name: t('pages.skill-review.actions.send') })).exists();
      });

      module('on click on the share button', function (hooks) {
        let campaignParticipationResult, screen, shareStub;

        hooks.beforeEach(async function () {
          // given
          const store = this.owner.lookup('service:store');

          const adapter = store.adapterFor('campaign-participation-result');
          shareStub = sinon.stub(adapter, 'share');

          this.set('campaign', {
            customResultPageText: 'My custom result page text',
            organizationId: 1,
          });

          campaignParticipationResult = store.createRecord('campaign-participation-result', {
            campaignParticipationBadges: [],
            isShared: false,
            canImprove: true,
            masteryRate: 0.75,
          });
          campaignParticipationResult.id = 'campaignParticipationResultId';
          this.set('campaignParticipationResult', campaignParticipationResult);

          // when
          screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
          );
        });

        test('on success, it should display a notification and hide improve elements', async function (assert) {
          // given
          shareStub.resolves();

          // when
          await click(screen.getByRole('button', { name: t('pages.skill-review.actions.send') }));

          // then
          assert.ok(shareStub.calledOnce);
          sinon.assert.calledWithExactly(shareStub, campaignParticipationResult.id);

          assert.dom(screen.queryByText(t('pages.skill-review.hero.shared-message'))).exists();
          assert.dom(screen.queryByText(t('pages.skill-review.error'))).doesNotExist();

          assert.dom(screen.queryByText(t('pages.skill-review.hero.explanations.improve'))).doesNotExist();
          assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.actions.improve') })).doesNotExist();
        });

        test('on fail, it should display an error', async function (assert) {
          // given
          shareStub.rejects();

          // when
          await click(screen.getByRole('button', { name: t('pages.skill-review.actions.send') }));

          // then
          assert.dom(screen.queryByText(t('pages.skill-review.error'))).exists();

          assert.dom(screen.getByText(t('pages.skill-review.hero.explanations.improve'))).exists();
          assert.dom(screen.getByRole('button', { name: t('pages.skill-review.actions.improve') })).exists();
        });

        module('when there are quest results', function (hooks) {
          let shareProfileReward;

          hooks.beforeEach(async function () {
            const store = this.owner.lookup('service:store');
            const adapter = store.adapterFor('campaign-participation-result');
            shareProfileReward = sinon.stub(adapter, 'shareProfileReward');
            shareProfileReward.resolves();
          });

          test('it should call the shareProfileReward adapter method', async function (assert) {
            // given
            const profileRewardId = 12;
            this.set('questResults', [
              {
                obtained: true,
                profileRewardId,
                reward: { key: 'sixth-grade-attestation-template' },
              },
            ]);

            // when
            screen = await render(
              hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @questResults={{this.questResults}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
            );
            await click(screen.getByRole('button', { name: t('pages.skill-review.actions.send') }));

            // then
            assert.ok(shareProfileReward.calledOnce);
            sinon.assert.calledWithExactly(shareProfileReward, campaignParticipationResult.id, profileRewardId);
          });

          test('it should not call the shareProfileReward adapter method if quest result is not obtained', async function (assert) {
            // given
            this.set('questResults', [
              {
                obtained: false,
                profileRewardId: null,
                reward: { key: 'sixth-grade-attestation-template' },
              },
            ]);

            // when
            screen = await render(
              hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @questResults={{this.questResults}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
            );
            await click(screen.getByRole('button', { name: t('pages.skill-review.actions.send') }));

            // then
            assert.ok(shareProfileReward.notCalled);
          });
        });

        module('when there are no quest results', function () {
          test('it should not call the shareProfileReward adapter method', async function (assert) {
            // given
            const store = this.owner.lookup('service:store');
            const adapter = store.adapterFor('campaign-participation-result');
            const shareProfileReward = sinon.stub(adapter, 'shareProfileReward');

            // when
            const screen = await render(
              hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
            );
            await click(screen.getByRole('button', { name: t('pages.skill-review.actions.send') }));

            // then
            assert.ok(shareProfileReward.notCalled);
          });
        });
      });
    });

    module('when results are shared', function () {
      module('when there are no trainings and no custom link', function () {
        test('it should display a message and a homepage link', async function (assert) {
          // given
          this.set('campaign', { organizationId: 1 });
          this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
          );

          // then
          assert.dom(screen.getByText(t('pages.skill-review.hero.shared-message'))).exists();
          assert.dom(screen.getByRole('link', { name: t('navigation.back-to-homepage') })).exists();
        });
      });

      module('when there are no trainings and a custom link', function () {
        test('it should display a message but no homepage link', async function (assert) {
          // given
          this.set('campaign', {
            organizationId: 1,
            hasCustomResultPageButton: true,
          });
          this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
          );

          // then
          assert.dom(screen.getByText(t('pages.skill-review.hero.shared-message'))).exists();
          assert.dom(screen.queryByRole('link', { name: t('navigation.back-to-homepage') })).doesNotExist();
        });
      });

      module('when there are trainings', function (hooks) {
        let screen, showTrainings;

        hooks.beforeEach(async function () {
          // given
          this.set('hasTrainings', true);

          showTrainings = sinon.stub();
          this.set('showTrainings', showTrainings);

          this.set('campaign', { organizationId: 1 });
          this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

          // when
          screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @hasTrainings={{this.hasTrainings}}
  @showTrainings={{this.showTrainings}}
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
          );
        });

        test('it should display specific explanation and a see trainings button', async function (assert) {
          // then
          assert.dom(screen.getByText(t('pages.skill-review.hero.explanations.trainings'))).exists();
          assert.dom(screen.getByRole('button', { name: t('pages.skill-review.hero.see-trainings') })).exists();
        });

        test('on see trainings click, it should trigger a specific action', async function (assert) {
          // then
          await click(screen.getByRole('button', { name: t('pages.skill-review.hero.see-trainings') }));

          sinon.assert.calledOnce(showTrainings);
          assert.ok(true);
        });
      });
    });
  });

  module('when campaign results should not be shared', function () {
    module('when there is no custom link', function () {
      module('when user is anonymous', function () {
        test('it should display only a connection link', async function (assert) {
          // given
          stubCurrentUserService(this.owner, { isAnonymous: true });

          this.set('campaign', { hasCustomResultPageButton: false });
          this.set('campaignParticipationResult', { masteryRate: 0.75 });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{false}}
/>`,
          );

          // then
          assert.dom(screen.queryByText(t('pages.skill-review.hero.explanations.send-results'))).doesNotExist();

          assert.dom(screen.getByRole('link', { name: t('common.actions.login') })).exists();
          assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.hero.see-trainings') })).doesNotExist();
          assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.actions.send') })).doesNotExist();
        });
      });

      module('when user is connected', function () {
        test('it should display only a connection link', async function (assert) {
          // given
          stubCurrentUserService(this.owner, { firstName: 'Hermione' });

          this.set('campaign', { hasCustomResultPageButton: false });
          this.set('campaignParticipationResult', { masteryRate: 0.75 });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{false}}
/>`,
          );

          // then
          assert.dom(screen.queryByText(t('pages.skill-review.hero.explanations.send-results'))).doesNotExist();

          assert.dom(screen.getByRole('link', { name: t('navigation.back-to-homepage') })).exists();
          assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.hero.see-trainings') })).doesNotExist();
          assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.actions.send') })).doesNotExist();
        });
      });
    });

    module('when there is a custom link', function () {
      test('it should not display a homepage link', async function (assert) {
        // given
        this.set('campaign', { hasCustomResultPageButton: true });
        this.set('campaignParticipationResult', { masteryRate: 0.75 });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{false}}
/>`,
        );

        // then
        assert.dom(screen.queryByText(t('pages.skill-review.hero.explanations.send-results'))).doesNotExist();

        assert.dom(screen.queryByRole('link', { name: t('navigation.back-to-homepage') })).doesNotExist();
        assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.hero.see-trainings') })).doesNotExist();
        assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.actions.send') })).doesNotExist();
      });
    });
  });

  module('improve results', function () {
    module('when user can improve results', function (hooks) {
      let beginImprovementStub, campaign, campaignParticipationResult, router, screen;

      hooks.beforeEach(async function () {
        // given
        const store = this.owner.lookup('service:store');

        router = this.owner.lookup('service:router');
        router.transitionTo = sinon.stub();

        const adapter = store.adapterFor('campaign-participation-result');
        sinon.stub(adapter, 'share');
        beginImprovementStub = sinon.stub(adapter, 'beginImprovement');

        campaignParticipationResult = store.createRecord('campaign-participation-result', {
          masteryRate: 0.75,
          canImprove: true,
        });
        campaignParticipationResult.id = 'campaignParticipationResultId';
        this.set('campaignParticipationResult', campaignParticipationResult);

        campaign = this.set('campaign', { organizationId: 1, code: 'ABC' });

        // when
        screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
        );
      });

      test('it should display specific explanation and button', async function (assert) {
        // given
        this.set('campaign', { organizationId: 1 });
        this.set('campaignParticipationResult', { masteryRate: 0.75, canImprove: true });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
  @isSharableCampaign={{true}}
/>`,
        );

        // then
        assert.dom(screen.getByText(t('pages.skill-review.hero.explanations.improve'))).exists();
        assert.dom(screen.getByRole('button', { name: t('pages.skill-review.actions.improve') })).exists();
      });

      module('loading button', function () {
        test('should not be able to share the campaign at the same time', async function (assert) {
          // given
          const pendingPromise = new Promise(() => {});
          beginImprovementStub.resolves(pendingPromise);
          // when
          await click(screen.getByRole('button', { name: t('pages.skill-review.actions.improve') }));
          // then
          assert.notOk(screen.queryByRole('button', { name: t('pages.skill-review.actions.send') }));
          assert.notOk(screen.queryByRole('button', { name: t('pages.skill-review.actions.improve') }));
        });

        test('should not be able to improve the campaign at the same time', async function (assert) {
          // given
          const pendingPromise = new Promise(() => {});
          beginImprovementStub.resolves(pendingPromise);
          // when
          await click(screen.getByRole('button', { name: t('pages.skill-review.actions.send') }));
          // then
          assert.notOk(screen.queryByRole('button', { name: t('pages.skill-review.actions.send') }));
          assert.notOk(screen.queryByRole('button', { name: t('pages.skill-review.actions.improve') }));
        });
      });

      module('on improve button click', function () {
        test('on success, it should restart the campaign', async function (assert) {
          // when
          await click(screen.getByRole('button', { name: t('pages.skill-review.actions.improve') }));

          // then
          sinon.assert.calledWithExactly(beginImprovementStub, campaignParticipationResult.id);
          assert.ok(beginImprovementStub.calledOnce);

          sinon.assert.calledWithExactly(router.transitionTo, 'campaigns.entry-point', campaign.code);
          assert.ok(router.transitionTo.calledOnce);
        });

        test('on fail, it should display an error', async function (assert) {
          // given
          beginImprovementStub.withArgs('campaignParticipationResultId').rejects();

          // when
          await click(screen.getByRole('button', { name: t('pages.skill-review.actions.improve') }));
          // then
          assert.dom(screen.queryByText(t('pages.skill-review.error'))).exists();
          assert.dom(screen.getByText(t('pages.skill-review.hero.explanations.improve'))).exists();
          assert.dom(screen.getByRole('button', { name: t('pages.skill-review.actions.improve') })).exists();

          assert.notOk(router.transitionTo.calledOnce);
        });
      });
    });

    module('when user can not improve results', function () {
      test('it should not display specific explanation and button', async function (assert) {
        // given
        this.set('campaign', { organizationId: 1 });
        this.set('campaignParticipationResult', { masteryRate: 0.75, canImprove: false });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        assert.dom(screen.queryByText(t('pages.skill-review.hero.explanations.improve'))).doesNotExist();
        assert.dom(screen.queryByRole('button', { name: t('pages.skill-review.actions.improve') })).doesNotExist();
      });
    });
  });

  module('stages', function () {
    module('when there are stages', function () {
      test('displays reached stage stars and message', async function (assert) {
        // given
        this.set('campaign', { organizationId: 1 });
        this.set('campaignParticipationResult', {
          hasReachedStage: true,
          reachedStage: { reachedStage: 4, totalStage: 5, message: 'lorem ipsum dolor sit amet' },
        });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        const stars = {
          acquired: this.campaignParticipationResult.reachedStage.reachedStage - 1,
          total: this.campaignParticipationResult.reachedStage.totalStage - 1,
        };
        assert.strictEqual(screen.getAllByText(t('pages.skill-review.stage.starsAcquired', stars)).length, 2);

        assert.dom(screen.getByText(this.campaignParticipationResult.reachedStage.message)).exists();
      });
    });

    module('when there is only one stage', function () {
      test('displays the stage 0 message but no stars', async function (assert) {
        // given
        this.set('campaign', { organizationId: 1 });
        this.set('campaignParticipationResult', {
          hasReachedStage: true,
          reachedStage: { reachedStage: 1, totalStage: 1, message: 'Stage 0 message' },
        });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        const stars = {
          acquired: this.campaignParticipationResult.reachedStage.reachedStage - 1,
          total: this.campaignParticipationResult.reachedStage.totalStage - 1,
        };
        assert.dom(screen.queryByText(t('pages.skill-review.stage.starsAcquired', stars))).doesNotExist();

        assert.dom(screen.getByText(this.campaignParticipationResult.reachedStage.message)).exists();
      });
    });

    module('when there is no stage', function () {
      test('not display stars and message', async function (assert) {
        // given
        this.set('campaign', { organizationId: 1 });
        this.set('campaignParticipationResult', {
          hasReachedStage: false,
          reachedStage: { message: 'not existing message' },
        });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        const stars = { acquired: 0, total: 0 };
        assert.dom(screen.queryByText(t('pages.skill-review.stage.starsAcquired', stars))).doesNotExist();

        assert.dom(screen.queryByTestId('stage-message')).doesNotExist();
      });
    });
  });

  module('acquired badges', function () {
    module('when there is at least one acquired badge', function () {
      test('should display the acquired badges block', async function (assert) {
        // given
        const store = this.owner.lookup('service:store');
        const acquiredBadge = store.createRecord('campaign-participation-badge', { isAcquired: true });
        const campaignParticipationResult = store.createRecord('campaign-participation-result', {
          campaignParticipationBadges: [acquiredBadge],
        });
        this.set('campaignParticipationResult', campaignParticipationResult);

        this.set('campaign', { organizationId: 1 });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        const badgesTitle = screen.getByRole('heading', {
          name: t('pages.skill-review.hero.acquired-badges-title'),
        });
        assert.dom(badgesTitle).exists();
      });
    });

    module('when there is no acquired badge', function () {
      test('should not display the acquired badges block', async function (assert) {
        // given
        const store = this.owner.lookup('service:store');
        const notAquiredBadge = store.createRecord('campaign-participation-badge', { isAcquired: false });
        const campaignParticipationResult = store.createRecord('campaign-participation-result', {
          campaignParticipationBadges: [notAquiredBadge],
        });
        this.set('campaignParticipationResult', campaignParticipationResult);

        this.set('campaign', { organizationId: 1 });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        const badgesTitle = screen.queryByRole('heading', {
          name: t('pages.skill-review.hero.acquired-badges-title'),
        });
        assert.dom(badgesTitle).doesNotExist();
      });
    });
  });

  module('custom organization block', function () {
    module('when campaign is with simplified access', function () {
      module('when customResultPageText if defined', function () {
        test('displays the organization block with the text', async function (assert) {
          // given
          this.set('campaign', {
            customResultPageText: 'My custom result page text',
            organizationId: 1,
            isSimplifiedAccess: true,
          });

          this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: false });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
          );

          // then
          assert.dom(screen.getByText(t('pages.skill-review.organization-message'))).exists();
          assert.dom(screen.getByText('My custom result page text')).exists();
        });
      });

      module('when campaign has customResultPageButton', function () {
        test('displays the organization block with the custom button', async function (assert) {
          // given
          const store = this.owner.lookup('service:store');
          const campaign = await store.createRecord('campaign', {
            customResultPageButtonUrl: 'https://example.net',
            customResultPageButtonText: 'Custom result page button text',
            organizationId: 1,
          });
          this.set('campaign', campaign);
          this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
          );

          // then
          assert.dom(screen.getByText(t('pages.skill-review.organization-message'))).exists();
          assert.dom(screen.getByRole('link', { name: 'Custom result page button text' })).exists();
        });
      });

      module('when campaign has no custom result page button or text', function () {
        test('no display the organization block', async function (assert) {
          // given
          this.set('campaign', { organizationId: 1 });
          this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
          );

          // then
          assert.dom(screen.queryByText(t('pages.skill-review.organization-message'))).doesNotExist();
          assert.dom(screen.queryByText('My custom result page text')).doesNotExist();
        });
      });
    });

    module('when campaign is sharable', function () {
      module('when results are not shared', function () {
        test('it should not display the organization block', async function (assert) {
          // given
          this.set('campaign', { organizationId: 1 });
          this.set('campaignParticipationResult', { masteryRate: 0.75 });

          // when
          const screen = await render(
            hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
          );

          // then
          assert.dom(screen.queryByText(t('pages.skill-review.organization-message'))).doesNotExist();
          assert.dom(screen.queryByText('My custom result page text')).doesNotExist();
        });
      });

      module('when results are shared', function () {
        module('when customResultPageText if defined', function () {
          test('displays the organization block with the text', async function (assert) {
            // given
            this.set('campaign', {
              customResultPageText: 'My custom result page text',
              organizationId: 1,
            });

            this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

            // when
            const screen = await render(
              hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
            );

            // then
            assert.dom(screen.getByText(t('pages.skill-review.organization-message'))).exists();
            assert.dom(screen.getByText('My custom result page text')).exists();
          });
        });

        module('when campaign has customResultPageButton', function () {
          test('displays the organization block with the custom button', async function (assert) {
            // given
            const store = this.owner.lookup('service:store');
            const campaign = await store.createRecord('campaign', {
              customResultPageButtonUrl: 'https://example.net',
              customResultPageButtonText: 'Custom result page button text',
              organizationId: 1,
            });
            this.set('campaign', campaign);
            this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

            // when
            const screen = await render(
              hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
            );

            // then
            assert.dom(screen.getByText(t('pages.skill-review.organization-message'))).exists();
            assert.dom(screen.getByRole('link', { name: 'Custom result page button text' })).exists();
          });
        });

        module('when campaign has no custom result page button or text', function () {
          test('no display the organization block', async function (assert) {
            // given
            this.set('campaign', { organizationId: 1 });
            this.set('campaignParticipationResult', { masteryRate: 0.75, isShared: true });

            // when
            const screen = await render(
              hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
            );

            // then
            assert.dom(screen.queryByText(t('pages.skill-review.organization-message'))).doesNotExist();
            assert.dom(screen.queryByText('My custom result page text')).doesNotExist();
          });
        });
      });
    });
  });

  module('retry or reset block', function () {
    module('when the user can retry the campaign', function () {
      test('displays the retry or reset block', async function (assert) {
        // given
        this.set('campaign', { organizationId: 1 });
        this.set('campaignParticipationResult', { masteryRate: 0.1, canRetry: true, canReset: true });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        assert.dom(screen.getByText(t('pages.skill-review.hero.retry.title'))).exists();
      });
    });

    module('when the user can not retry the campaign', function () {
      test('not display the retry or reset block', async function (assert) {
        // given
        this.set('campaign', { organizationId: 1 });
        this.set('campaignParticipationResult', { masteryRate: 0.1, canRetry: false, canReset: true });

        // when
        const screen = await render(
          hbs`<Campaigns::Assessment::Results::EvaluationResultsHero
  @campaign={{this.campaign}}
  @campaignParticipationResult={{this.campaignParticipationResult}}
/>`,
        );

        // then
        assert.dom(screen.queryByText(t('pages.skill-review.hero.retry.title'))).doesNotExist();
      });
    });
  });
});
