import REST from '@ember-data/adapter/rest';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

import { stubSessionService } from '../../helpers/service-stubs.js';

const FRENCH_INTERNATIONAL_LOCALE = 'fr';
const FRANCE_TLD = 'fr';
const ENGLISH_INTERNATIONAL_LOCALE = 'en';
const FRENCH_FRANCE_LOCALE = 'fr-fr';

module('Unit | Adapters | ApplicationAdapter', function (hooks) {
  setupTest(hooks);

  test('should specify /api as the root url', function (assert) {
    // Given
    const applicationAdapter = this.owner.lookup('adapter:application');

    // Then
    assert.strictEqual(applicationAdapter.namespace, 'api');
  });

  module('get headers()', function () {
    module('Authorization headers', function () {
      test('should add header with authentication token when the session is authenticated', function (assert) {
        // Given
        const access_token = '23456789';
        const applicationAdapter = this.owner.lookup('adapter:application');

        // When
        applicationAdapter.set('session', { isAuthenticated: true, data: { authenticated: { access_token } } });

        // Then
        assert.strictEqual(applicationAdapter.headers['Authorization'], `Bearer ${access_token}`);
      });

      test('should not add header authentication token when the session is not authenticated', function (assert) {
        // Given
        const applicationAdapter = this.owner.lookup('adapter:application');

        // When
        applicationAdapter.set('session', {});

        // Then
        assert.notOk(applicationAdapter.headers['Authorization']);
      });
    });

    module('Accept-Language headers', function () {
      test('should add Accept-Language header set to fr-fr when the current domain contains pix.fr and locale is "fr"', function (assert) {
        // Given
        const applicationAdapter = this.owner.lookup('adapter:application');
        applicationAdapter.intl = { primaryLocale: FRENCH_INTERNATIONAL_LOCALE };

        // When
        applicationAdapter.set('currentDomain', {
          getExtension() {
            return FRANCE_TLD;
          },
        });

        // Then
        assert.strictEqual(applicationAdapter.headers['Accept-Language'], FRENCH_FRANCE_LOCALE);
      });

      test('should add Accept-Language header set to fr when the current domain contains pix.digital and locale is "fr"', function (assert) {
        // Given
        const applicationAdapter = this.owner.lookup('adapter:application');
        applicationAdapter.intl = { primaryLocale: FRENCH_INTERNATIONAL_LOCALE };

        // When
        applicationAdapter.set('currentDomain', {
          getExtension() {
            return 'digital';
          },
        });

        // Then
        assert.strictEqual(applicationAdapter.headers['Accept-Language'], FRENCH_INTERNATIONAL_LOCALE);
      });

      test('should add Accept-Language header set to en when locale is "en"', function (assert) {
        // Given
        const applicationAdapter = this.owner.lookup('adapter:application');

        // When
        applicationAdapter.intl = { primaryLocale: ENGLISH_INTERNATIONAL_LOCALE };

        // Then
        assert.strictEqual(applicationAdapter.headers['Accept-Language'], ENGLISH_INTERNATIONAL_LOCALE);
      });
    });
  });

  module('ajax()', function () {
    test('should queue ajax calls', function (assert) {
      // Given
      const applicationAdapter = this.owner.lookup('adapter:application');
      applicationAdapter.ajaxQueue = { add: sinon.stub().resolves() };

      // When
      applicationAdapter.findRecord(null, { modelName: 'user' }, 1);

      // Then
      sinon.assert.calledOnce(applicationAdapter.ajaxQueue.add);
      assert.ok(true);
    });
  });

  module('handleResponse()', function () {
    module('when an HTTP status code 401 is received', function () {
      test('should invalidate the current session', function (assert) {
        // given
        const applicationAdapter = this.owner.lookup('adapter:application');
        applicationAdapter.session = {
          invalidate: sinon.stub(),
          isAuthenticated: true,
        };
        const status = 401;
        const headers = {};
        const payload = {};
        const requestData = {};

        // when
        applicationAdapter.handleResponse(status, headers, payload, requestData);

        // then
        sinon.assert.calledOnce(applicationAdapter.session.invalidate);
        assert.ok(true);
      });
    });

    module('when the HTTP status code received is different from 401', function () {
      test('should not invalidate the current session', function (assert) {
        // given
        const sessionService = stubSessionService(this.owner, { isAuthenticated: true });
        const applicationAdapter = this.owner.lookup('adapter:application');
        sinon.stub(REST.prototype, 'handleResponse');

        // when
        applicationAdapter.handleResponse(302);

        // then
        sinon.assert.notCalled(sessionService.invalidate);
        sinon.assert.calledOnce(REST.prototype.handleResponse);
        sinon.restore();
        assert.ok(true);
      });
    });
  });
});
