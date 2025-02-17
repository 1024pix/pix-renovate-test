import { setupTest } from 'ember-qunit';
import {
  DEFAULT_LOCALE,
  ENGLISH_INTERNATIONAL_LOCALE,
  FRENCH_FRANCE_LOCALE,
  FRENCH_INTERNATIONAL_LOCALE,
} from 'pix-orga/services/locale';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Service | session', function (hooks) {
  setupTest(hooks);

  let routerService;
  let service;
  let localeService;

  hooks.beforeEach(function () {
    routerService = this.owner.lookup('service:router');
    routerService.transitionTo = sinon.stub();

    service = this.owner.lookup('service:session');

    localeService = this.owner.lookup('service:locale');
    Object.assign(localeService, {
      setLocaleCookie: sinon.stub(),
      hasLocaleCookie: sinon.stub(),
      setLocale: sinon.stub(),
      handleUnsupportedLanguage: sinon.stub(),
    });
  });

  module('#handleAuthentication', function () {
    test('calls handleLocale', async function (assert) {
      // given
      service.currentUser = {
        load: sinon.stub(),
        prescriber: {
          lang: FRENCH_INTERNATIONAL_LOCALE,
          save: sinon.stub(),
        },
      };
      service.handleLocale = sinon.stub();

      // when
      await service.handleAuthentication();

      // then
      sinon.assert.called(service.handleLocale);
      assert.ok(true);
    });
  });

  module('#handleInvalidation', function () {
    test('overrides handleInvalidation method', function (assert) {
      // then
      assert.true(service.handleInvalidation instanceof Function);
    });

    test('calls clear method from session store', function (assert) {
      // given
      sinon.stub(service.store, 'clear');

      // when
      service.handleInvalidation();

      // then
      assert.true(service.store.clear.calledOnce);
    });
  });

  module('#handleLocale', function () {
    module('when domain is .fr', function () {
      module('when there is no cookie locale', function () {
        test('adds a cookie locale with "fr-FR" as value', function (assert) {
          // given
          localeService.hasLocaleCookie.returns(false);
          const isFranceDomain = true;
          const localeFromQueryParam = undefined;
          const userLocale = undefined;

          // when
          service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

          // then
          sinon.assert.calledWith(localeService.setLocaleCookie, FRENCH_FRANCE_LOCALE);
          assert.ok(true);
        });
      });

      module('when there is a cookie locale', function () {
        test('does not update cookie locale', function (assert) {
          // given
          localeService.hasLocaleCookie.returns(true);
          const isFranceDomain = true;
          const localeFromQueryParam = undefined;
          const userLocale = undefined;

          // when
          service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

          // then
          sinon.assert.notCalled(localeService.setLocaleCookie);
          assert.ok(true);
        });
      });

      module('when no lang query param', function () {
        module('when user is not loaded', function () {
          test('sets the locale to be French international in every case', function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: null,
            };
            const isFranceDomain = true;
            const localeFromQueryParam = undefined;
            const userLocale = undefined;

            // when
            service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(localeService.setLocale, FRENCH_INTERNATIONAL_LOCALE);
            assert.ok(true);
          });
        });

        module('when user is loaded', function () {
          test('sets the locale to be French international in every case', function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: {
                lang: ENGLISH_INTERNATIONAL_LOCALE,
                save: sinon.stub(),
              },
            };
            const isFranceDomain = true;
            const localeFromQueryParam = undefined;
            const userLocale = ENGLISH_INTERNATIONAL_LOCALE;

            // when
            service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(localeService.setLocale, FRENCH_INTERNATIONAL_LOCALE);
            sinon.assert.notCalled(service.currentUser.prescriber.save);
            assert.ok(true);
          });
        });
      });

      module('when a lang query param is present', function () {
        module('when user is not loaded', function () {
          test('sets the locale to be French international in every case', function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: null,
            };
            const isFranceDomain = true;
            const localeFromQueryParam = ENGLISH_INTERNATIONAL_LOCALE;
            const userLocale = undefined;

            // when
            service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(localeService.setLocale, FRENCH_INTERNATIONAL_LOCALE);
            assert.ok(true);
          });
        });

        module('when user is loaded', function () {
          test('sets the locale to be French international in every case', function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: {
                lang: ENGLISH_INTERNATIONAL_LOCALE,
                save: sinon.stub(),
              },
            };
            const isFranceDomain = true;
            const localeFromQueryParam = ENGLISH_INTERNATIONAL_LOCALE;
            const userLocale = ENGLISH_INTERNATIONAL_LOCALE;

            // when
            service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(localeService.setLocale, FRENCH_INTERNATIONAL_LOCALE);
            sinon.assert.notCalled(service.currentUser.prescriber.save);
            assert.ok(true);
          });
        });
      });
    });

    module('when domain is .org', function (hooks) {
      let isFranceDomain;

      hooks.beforeEach(function () {
        isFranceDomain = false;
      });

      test('does not set the cookie locale', function (assert) {
        // given
        localeService.hasLocaleCookie.returns(false);
        const localeFromQueryParam = undefined;
        const userLocale = undefined;

        // when
        service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

        // then
        assert.true(localeService.setLocaleCookie.notCalled);
      });

      module('when no lang query param', function (hooks) {
        let localeFromQueryParam;

        hooks.beforeEach(function () {
          localeFromQueryParam = undefined;
        });

        module('when user is not loaded', function () {
          test('sets the default locale', function (assert) {
            // given
            const userLocale = undefined;

            // when
            service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            assert.true(localeService.setLocale.calledWith(DEFAULT_LOCALE));
          });
        });

        module('when user is loaded', function () {
          module('when user language is not available', function () {
            test('sets the locale to English international', function (assert) {
              // given
              const userLocale = 'my-new-language-code-here';

              // when
              service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              assert.true(localeService.setLocale.calledWith(ENGLISH_INTERNATIONAL_LOCALE));
              assert.true(service.data.localeNotSupported);
              assert.strictEqual(service.data.localeNotSupportedBannerClosed, undefined);
            });
          });

          test('sets the locale to the user’s lang', function (assert) {
            // given
            const userLocale = ENGLISH_INTERNATIONAL_LOCALE;

            // when
            service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            assert.true(localeService.setLocale.calledWith(ENGLISH_INTERNATIONAL_LOCALE));
          });
        });
      });

      module('when a lang query param is present', function () {
        module('when the lang query param is not supported', function () {
          module('when user is not loaded', function () {
            test('sets the default locale', function (assert) {
              // given
              const localeFromQueryParam = 'an invalid locale';
              const userLocale = undefined;

              // when
              service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              assert.true(localeService.setLocale.calledWith(DEFAULT_LOCALE));
            });
          });

          module('when user is loaded', function () {
            module('when user profile language is supported', function () {
              test(`sets the locale to the user's profile language`, function (assert) {
                // given
                const localeFromQueryParam = 'an invalid locale';
                const userLocale = ENGLISH_INTERNATIONAL_LOCALE;

                // when
                service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

                // then
                assert.true(localeService.setLocale.calledWith(ENGLISH_INTERNATIONAL_LOCALE));
              });
            });

            module('when user profile language is not supported', function () {
              test(`sets the locale to english`, function (assert) {
                // given
                const localeFromQueryParam = 'an invalid locale';
                const userLocale = 'not supported locale';

                // when
                service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

                // then
                assert.true(localeService.setLocale.calledWith(ENGLISH_INTERNATIONAL_LOCALE));
              });
            });
          });
        });

        module('when the lang query param is supported', function () {
          module('when user is not loaded', function () {
            test('sets the locale to the lang query param', function (assert) {
              // given
              const localeFromQueryParam = ENGLISH_INTERNATIONAL_LOCALE;
              const userLocale = undefined;
              localeService.handleUnsupportedLanguage
                .withArgs(ENGLISH_INTERNATIONAL_LOCALE)
                .returns(ENGLISH_INTERNATIONAL_LOCALE);

              // when
              service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              assert.true(localeService.setLocale.calledWith(ENGLISH_INTERNATIONAL_LOCALE));
            });
          });

          module('when user is loaded', function () {
            test('sets the locale to the lang query param which wins over', function (assert) {
              // given
              const localeFromQueryParam = ENGLISH_INTERNATIONAL_LOCALE;
              const userLocale = FRENCH_INTERNATIONAL_LOCALE;
              localeService.handleUnsupportedLanguage
                .withArgs(ENGLISH_INTERNATIONAL_LOCALE)
                .returns(ENGLISH_INTERNATIONAL_LOCALE);

              // when
              service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              assert.true(localeService.setLocale.calledWith(ENGLISH_INTERNATIONAL_LOCALE));
            });
          });
        });
      });
    });
  });

  module('#updateDataAttribute', function () {
    test('updates session data attribute value', function (assert) {
      // when
      service.updateDataAttribute('message', 'This is a message!');
      service.updateDataAttribute('isItUsed', true);
      service.updateDataAttribute('notDisplayed', false);

      // then
      assert.strictEqual(service.data.message, 'This is a message!');
      assert.true(service.data.isItUsed);
      assert.false(service.data.notDisplayed);
    });
  });
});
