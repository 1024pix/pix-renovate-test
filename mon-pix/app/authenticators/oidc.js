import { service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import fetch from 'fetch';
import ENV from 'mon-pix/config/environment';
import { decodeToken } from 'mon-pix/helpers/jwt';

export default class OidcAuthenticator extends BaseAuthenticator {
  @service intl;
  @service location;
  @service oidcIdentityProviders;
  @service session;

  async authenticate({ code, state, iss, identityProviderSlug, authenticationKey, hostSlug }) {
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Language': this.intl.primaryLocale,
        'Content-Type': 'application/json',
      },
    };
    const host = `${ENV.APP.API_HOST}/api/oidc/`;
    let body;
    const identityProvider = this.oidcIdentityProviders[identityProviderSlug];

    if (authenticationKey) {
      body = {
        identity_provider: identityProvider.code,
        authentication_key: authenticationKey,
      };
    } else {
      body = {
        identity_provider: identityProvider.code,
        code,
        state,
        iss,
      };

      if (this.session.isAuthenticated) {
        this.session.set('skipRedirectAfterSessionInvalidation', true);
        await this.session.invalidate();
      }
    }

    request.body = JSON.stringify({ data: { attributes: body } });
    const response = await fetch(host + hostSlug, request);

    const data = await response.json();
    if (!response.ok) {
      return Promise.reject(data);
    }

    const decodedAccessToken = decodeToken(data.access_token);

    return {
      access_token: data.access_token,
      logoutUrlUuid: data.logout_url_uuid,
      user_id: decodedAccessToken.user_id,
      source: identityProvider.source,
      shouldCloseSession: identityProvider.shouldCloseSession,
      identityProviderCode: identityProvider.code,
    };
  }

  restore(data) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(data['access_token'])) {
        resolve(data);
      }
      reject();
    });
  }

  /**
   * @param {Object} data - The current authenticated session data
   */
  async invalidate(data) {
    const { access_token, shouldCloseSession, identityProviderCode, logoutUrlUuid } = data || {};
    if (!shouldCloseSession) {
      return;
    }

    const response = await fetch(
      `${ENV.APP.API_HOST}/api/oidc/redirect-logout-url?identity_provider=${identityProviderCode}&logout_url_uuid=${logoutUrlUuid}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const { redirectLogoutUrl } = await response.json();

    this.session.alternativeRootURL = redirectLogoutUrl;
  }
}
