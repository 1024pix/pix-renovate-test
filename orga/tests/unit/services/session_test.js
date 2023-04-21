import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const DEFAULT_LOCALE = 'fr';
const FRENCH_INTERNATIONAL_LOCALE = 'fr';
const FRENCH_FRANCE_LOCALE = 'fr-FR';

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
    });
  });

  module('#handleAuthentication', function () {
    test('calls handleLocale', async function (assert) {
      // given
      service.currentUser = {
        load: sinon.stub(),
        prescriber: {
          lang: 'fr',
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
    test('should override handleInvalidation method', function (assert) {
      // when & then
      assert.ok(service.handleInvalidation instanceof Function);
    });
  });

  module('#handleLocale', function () {
    module('when domain is .fr', function () {
      module('when there is no cookie locale', function () {
        test('adds a cookie locale with "fr-FR" as value', async function (assert) {
          // given
          localeService.hasLocaleCookie.returns(false);

          // when
          const isFranceDomain = true;
          const localeFromQueryParam = undefined;
          const userLocale = undefined;
          await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

          // then
          sinon.assert.calledWith(localeService.setLocaleCookie, FRENCH_FRANCE_LOCALE);
          assert.ok(true);
        });
      });

      module('when there is a cookie locale', function () {
        test('does not update cookie locale', async function (assert) {
          // given
          localeService.hasLocaleCookie.returns(true);

          // when
          const isFranceDomain = true;
          const localeFromQueryParam = undefined;
          const userLocale = undefined;
          await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

          // then
          sinon.assert.notCalled(localeService.setLocaleCookie);
          assert.ok(true);
        });
      });

      module('when no lang query param', function () {
        module('when user is not loaded', function () {
          test('sets the locale to be French international in every case', async function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: null,
            };
            service._setLocale = sinon.stub();

            // when
            const isFranceDomain = true;
            const localeFromQueryParam = undefined;
            const userLocale = undefined;
            await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(service._setLocale, FRENCH_INTERNATIONAL_LOCALE);
            assert.ok(true);
          });
        });

        module('when user is loaded', function () {
          test('sets the locale to be French international in every case', async function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: {
                lang: 'en',
                save: sinon.stub(),
              },
            };
            service._setLocale = sinon.stub();

            // when
            const isFranceDomain = true;
            const localeFromQueryParam = undefined;
            const userLocale = 'en';
            await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(service._setLocale, FRENCH_INTERNATIONAL_LOCALE);
            sinon.assert.notCalled(service.currentUser.prescriber.save);
            assert.ok(true);
          });
        });
      });

      module('when a lang query param is present', function () {
        module('when user is not loaded', function () {
          test('sets the locale to be French international in every case', async function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: null,
            };
            service._setLocale = sinon.stub();

            // when
            const isFranceDomain = true;
            const localeFromQueryParam = 'en';
            const userLocale = undefined;
            await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(service._setLocale, FRENCH_INTERNATIONAL_LOCALE);
            assert.ok(true);
          });
        });

        module('when user is loaded', function () {
          test('sets the locale to be French international in every case', async function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: {
                lang: 'en',
                save: sinon.stub(),
              },
            };
            service._setLocale = sinon.stub();

            // when
            const isFranceDomain = true;
            const localeFromQueryParam = 'en';
            const userLocale = 'en';
            await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(service._setLocale, FRENCH_INTERNATIONAL_LOCALE);
            sinon.assert.notCalled(service.currentUser.prescriber.save);
            assert.ok(true);
          });
        });
      });
    });

    module('when domain is .org', function () {
      test('does not set the cookie locale', async function (assert) {
        // given
        localeService.hasLocaleCookie.returns(false);

        // when
        const isFranceDomain = false;
        const localeFromQueryParam = undefined;
        const userLocale = undefined;
        await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

        // then
        sinon.assert.notCalled(localeService.setLocaleCookie);
        assert.ok(true);
      });

      module('when no lang query param', function () {
        module('when user is not loaded', function () {
          test('sets the default locale', async function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: null,
            };
            service._setLocale = sinon.stub();

            // when
            const isFranceDomain = false;
            const localeFromQueryParam = undefined;
            const userLocale = undefined;
            await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(service._setLocale, DEFAULT_LOCALE);
            assert.ok(true);
          });
        });

        module('when user is loaded', function () {
          test('sets the locale to the user’s lang', async function (assert) {
            // given
            service.currentUser = {
              load: sinon.stub(),
              prescriber: {
                lang: 'en',
                save: sinon.stub(),
              },
            };
            service._setLocale = sinon.stub();

            // when
            const isFranceDomain = false;
            const localeFromQueryParam = undefined;
            const userLocale = 'en';
            await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

            // then
            sinon.assert.calledWith(service._setLocale, 'en');
            sinon.assert.notCalled(service.currentUser.prescriber.save);
            assert.ok(true);
          });
        });
      });

      module('when a lang query param is present', function () {
        module('when the lang query param is invalid', function () {
          module('when user is not loaded', function () {
            test('sets the default locale', async function (assert) {
              // given
              service.currentUser = {
                load: sinon.stub(),
                prescriber: null,
              };
              service._setLocale = sinon.stub();

              // when
              const isFranceDomain = false;
              const localeFromQueryParam = 'an invalid locale';
              const userLocale = undefined;
              await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              sinon.assert.calledWith(service._setLocale, DEFAULT_LOCALE);
              assert.ok(true);
            });
          });

          module('when user is loaded', function () {
            test('sets the locale to the user’s lang', async function (assert) {
              // given
              service.currentUser = {
                load: sinon.stub(),
                prescriber: {
                  lang: 'en',
                  save: sinon.stub(),
                },
              };
              service._setLocale = sinon.stub();

              // when
              const isFranceDomain = false;
              const localeFromQueryParam = 'an invalid locale';
              const userLocale = 'en';
              await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              sinon.assert.calledWith(service._setLocale, 'en');
              sinon.assert.notCalled(service.currentUser.prescriber.save);
              assert.ok(true);
            });
          });
        });

        module('when the lang query param is valid', function () {
          module('when user is not loaded', function () {
            test('sets the locale to the lang query param', async function (assert) {
              // given
              service.currentUser = {
                load: sinon.stub(),
                prescriber: null,
              };
              service._setLocale = sinon.stub();

              // when
              const isFranceDomain = false;
              const localeFromQueryParam = 'en';
              const userLocale = undefined;
              await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              sinon.assert.calledWith(service._setLocale, 'en');
              assert.ok(true);
            });
          });

          module('when user is loaded', function () {
            test('sets the locale to the lang query param which wins over', async function (assert) {
              // given
              service.currentUser = {
                load: sinon.stub(),
                prescriber: {
                  lang: 'fr',
                  save: sinon.stub(),
                },
              };
              service._setLocale = sinon.stub();

              // when
              const isFranceDomain = false;
              const localeFromQueryParam = 'en';
              const userLocale = 'fr';
              await service.handleLocale({ isFranceDomain, localeFromQueryParam, userLocale });

              // then
              sinon.assert.calledWith(service._setLocale, 'en');
              sinon.assert.calledWith(service.currentUser.prescriber.save, {
                adapterOptions: { lang: 'en' },
              });
              assert.ok(true);
            });
          });
        });
      });
    });
  });

  module('#_setLocale', function () {
    test('calls intl and dayjs services', async function (assert) {
      // given
      service.intl = { setLocale: sinon.stub() };
      service.dayjs = { setLocale: sinon.stub(), self: { locale: sinon.stub() } };

      // when
      await service._setLocale('some locale');

      // then
      sinon.assert.calledWith(service.intl.setLocale, ['some locale', 'fr']);
      sinon.assert.calledWith(service.dayjs.setLocale, 'some locale');
      assert.ok(true);
    });
  });
});
