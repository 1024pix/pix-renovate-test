import { User } from '../../../../../src/identity-access-management/domain/models/User.js';
import { config } from '../../../../../src/shared/config.js';
import { domainBuilder, expect, sinon } from '../../../../test-helper.js';

describe('Unit | Identity Access Management | Domain | Model | User', function () {
  let languageService;
  let localeService;
  let dependencies;

  beforeEach(function () {
    sinon.stub(config.dataProtectionPolicy, 'updateDate').value('2020-01-01');

    languageService = {
      assertLanguageAvailability: sinon.stub(),
      LANGUAGES_CODE: { FRENCH: 'fr' },
    };
    localeService = {
      getCanonicalLocale: sinon.stub(),
    };
    dependencies = { localeService, languageService };
  });

  describe('constructor', function () {
    it('handles createdAt and updatedAt', function () {
      // given
      const creationDate = new Date('2019-03-12T19:37:03Z');

      // when
      const user = new User({ createdAt: creationDate, updatedAt: creationDate });

      // then
      expect(user.createdAt.toISOString()).to.equal('2019-03-12T19:37:03.000Z');
      expect(user.updatedAt.toISOString()).to.equal('2019-03-12T19:37:03.000Z');
    });

    context('locale', function () {
      it('accepts no locale', function () {
        // given
        const users = [
          new User({ locale: '' }, dependencies),
          new User({ locale: null }, dependencies),
          new User({ locale: undefined }, dependencies),
        ];

        //then
        expect(users).to.have.lengthOf(3);
      });

      it('validates and canonicalizes the locale', function () {
        // given
        localeService.getCanonicalLocale.returns('fr-BE');

        // when
        const user = new User({ locale: 'fr-be' }, dependencies);

        // then
        expect(localeService.getCanonicalLocale).to.have.been.calledWithExactly('fr-be');
        expect(user.locale).to.equal('fr-BE');
      });
    });

    context('language', function () {
      it('returns user given language', function () {
        // when
        const user = new User({ lang: 'nl' }, dependencies);

        // then
        expect(user.lang).to.equal('nl');
      });

      context('when there is no language given', function () {
        it('returns default language', function () {
          // when
          const user = new User({}, dependencies);
          // then
          expect(user.lang).to.equal('fr');
        });
      });
    });

    context('email confirmation', function () {
      context('when emailConfirmedAt is defined', function () {
        it('returns "true" for attribute "emailConfirmed"', function () {
          // when
          const user = new User({ emailConfirmedAt: new Date() });

          // then
          expect(user.emailConfirmed).to.be.true;
        });
      });

      context('when emailConfirmedAt is not defined', function () {
        it('returns "false" for attribute "emailConfirmed"', function () {
          // when
          const user = new User();

          // then
          expect(user.emailConfirmed).to.false;
        });
      });
    });
  });

  describe('setLocaleIfNotAlreadySet', function () {
    it('deals with empty locale', function () {
      // given
      const user = new User(undefined, dependencies);

      // when
      user.setLocaleIfNotAlreadySet(null, { localeService });

      // then
      expect(localeService.getCanonicalLocale).to.not.have.been.called;
      expect(user.locale).to.be.undefined;
      expect(user.hasBeenModified).to.be.false;
    });

    context('when user has no locale', function () {
      it('validates, canonicalizes and sets the locale', function () {
        // given
        const user = new User(undefined, dependencies);
        localeService.getCanonicalLocale.returns('fr-FR');

        // when
        user.setLocaleIfNotAlreadySet('fr-fr', { localeService });

        // then
        expect(localeService.getCanonicalLocale).to.have.been.calledWithExactly('fr-fr');
        expect(user.locale).to.equal('fr-FR');
        expect(user.hasBeenModified).to.be.true;
      });
    });

    context('when user has a locale', function () {
      it('does not set a new locale', function () {
        // given
        localeService.getCanonicalLocale.returns('en');
        const user = new User({ locale: 'en' }, dependencies);

        // Overload our stub to make sure it is not called after the user has been created
        localeService = {
          getCanonicalLocale: sinon.stub(),
        };

        // when
        user.setLocaleIfNotAlreadySet('fr-fr');

        // then
        expect(localeService.getCanonicalLocale).to.not.have.been.called;
        expect(user.locale).to.equal('en');
        expect(user.hasBeenModified).to.be.false;
      });
    });
  });

  describe('isLinkedToOrganizations', function () {
    it('should be true if user has a role in an organization', function () {
      // given
      const user = domainBuilder.buildUser({
        memberships: [domainBuilder.buildMembership()],
      });

      // when
      const isLinked = user.isLinkedToOrganizations();

      //then
      expect(isLinked).to.be.true;
    });

    it('should be false is user has no role in no organization', function () {
      // given
      const user = new User(undefined, dependencies);

      // when
      const isLinked = user.isLinkedToOrganizations();

      //then
      expect(isLinked).to.be.false;
    });
  });

  describe('isLinkedToCertificationCenters', function () {
    it('should be true if user has a role in a certification center', function () {
      // given
      const user = domainBuilder.buildUser({
        certificationCenterMemberships: [domainBuilder.buildCertificationCenterMembership()],
      });

      // when
      const isLinked = user.isLinkedToCertificationCenters();

      // then
      expect(isLinked).to.be.true;
    });

    it('should be false if user has no role in certification center', function () {
      // given
      const user = new User(undefined, dependencies);

      // when
      const isLinked = user.isLinkedToCertificationCenters();

      // then
      expect(isLinked).to.be.false;
    });
  });

  describe('hasAccessToOrganization', function () {
    it('should be false is user has no access to no organizations', function () {
      // given
      const user = new User(undefined, dependencies);
      const organizationId = 12345;

      // when
      const hasAccess = user.hasAccessToOrganization(organizationId);

      //then
      expect(hasAccess).to.be.false;
    });

    it('should be false is the user has access to many organizations, but not the one asked', function () {
      // given
      const organizationId = 12345;
      const user = domainBuilder.buildUser();
      user.memberships.push(domainBuilder.buildMembership());
      user.memberships[0].organization.id = 93472;
      user.memberships[1].organization.id = 74569;

      // when
      const hasAccess = user.hasAccessToOrganization(organizationId);

      //then
      expect(hasAccess).to.be.false;
    });

    it('should be true if the user has an access to the given organizationId', function () {
      // given
      const organizationId = 12345;
      const user = domainBuilder.buildUser();
      user.memberships[0].organization.id = 12345;

      // when
      const hasAccess = user.hasAccessToOrganization(organizationId);

      //then
      expect(hasAccess).to.be.true;
    });
  });

  describe('hasAccessToCertificationCenter', function () {
    it('should be false if user has no access to given certification center', function () {
      // given
      const user = new User(undefined, dependencies);
      const certificationCenterId = 12345;

      // when
      const hasAccess = user.hasAccessToCertificationCenter(certificationCenterId);

      // then
      expect(hasAccess).to.be.false;
    });

    it('should be false if user has access to many CertificationCenters, but not the given one', function () {
      // given
      const certificationCenterId = 12345;
      const user = domainBuilder.buildUser();
      user.certificationCenterMemberships.push(domainBuilder.buildCertificationCenterMembership());
      user.certificationCenterMemberships[0].certificationCenter.id = 93472;
      user.certificationCenterMemberships[1].certificationCenter.id = 74569;

      // when
      const hasAccess = user.hasAccessToCertificationCenter(certificationCenterId);

      //then
      expect(hasAccess).to.be.false;
    });

    it('should be true if the user has an access to the given CertificationCenterId', function () {
      // given
      const certificationCenterId = 12345;
      const user = domainBuilder.buildUser();
      user.certificationCenterMemberships[0].certificationCenter.id = 12345;

      // when
      const hasAccess = user.hasAccessToCertificationCenter(certificationCenterId);

      //then
      expect(hasAccess).to.be.true;
    });

    it('should be false if the user has a disabled access to the given CertificationCenterId', function () {
      // given
      const certificationCenterId = 12345;
      const now = new Date();
      const user = domainBuilder.buildUser();
      user.certificationCenterMemberships = [
        domainBuilder.buildCertificationCenterMembership({
          certificationCenter: { id: certificationCenterId },
          disabledAt: now,
        }),
      ];

      // when
      const hasAccess = user.hasAccessToCertificationCenter(certificationCenterId);

      //then
      expect(hasAccess).to.be.false;
    });
  });

  describe('#email', function () {
    it('should normalize email', function () {
      // given
      const userData = {
        email: 'TESTMAIL@gmail.com',
      };

      // when
      const userObject = new User(userData, dependencies);

      // then
      expect(userObject.email).to.equal('testmail@gmail.com');
    });

    it('should default email to undefined', function () {
      // given
      const userData = {
        firstName: 'Bob',
      };

      // when
      const userObject = new User(userData, dependencies);

      // then
      expect(userObject.email).to.be.undefined;
    });

    it('it accepts null as a valid value for email', function () {
      // given
      const userData = {
        firstName: 'Alice',
        email: null,
      };

      // when
      const userObject = new User(userData, dependencies);

      // then
      expect(userObject.email).to.be.null;
    });
  });

  describe('#shouldChangePassword', function () {
    context('when there is a Pix authentication method', function () {
      it('should return true', function () {
        // given
        const oneTimePassword = 'Azerty123*';

        const pixAuthenticationMethod =
          domainBuilder.buildAuthenticationMethod.withPixAsIdentityProviderAndHashedPassword({
            hashedPassword: oneTimePassword,
            shouldChangePassword: true,
          });

        const user = new User(
          {
            id: 1,
            email: 'email@example.net',
            authenticationMethods: [pixAuthenticationMethod],
          },
          dependencies,
        );

        // when
        const shouldChangePassword = user.shouldChangePassword;

        // then
        expect(shouldChangePassword).to.be.true;
      });

      it('should return false when should not change password', function () {
        // given
        const pixAuthenticationMethod =
          domainBuilder.buildAuthenticationMethod.withPixAsIdentityProviderAndHashedPassword({
            shouldChangePassword: false,
          });

        const user = new User(
          {
            id: 1,
            email: 'email@example.net',
            authenticationMethods: [pixAuthenticationMethod],
          },
          dependencies,
        );

        // when
        const shouldChangePassword = user.shouldChangePassword;

        // then
        expect(shouldChangePassword).to.be.false;
      });
    });

    context('when there is no Pix authentication method', function () {
      it('should return null', function () {
        // given
        const poleEmploiAuthenticationMethod =
          domainBuilder.buildAuthenticationMethod.withPoleEmploiAsIdentityProvider();

        const user = new User(
          {
            id: 1,
            authenticationMethods: [poleEmploiAuthenticationMethod],
          },
          dependencies,
        );

        // when
        const shouldChangePassword = user.shouldChangePassword;

        // then
        expect(shouldChangePassword).to.be.null;
      });
    });
  });

  describe('#passwordHash', function () {
    context('when there is a Pix authentication method', function () {
      it('returns the password hash', function () {
        // given
        const hashedPassword = 'xxx';
        const pixAuthenticationMethod =
          domainBuilder.buildAuthenticationMethod.withPixAsIdentityProviderAndHashedPassword({ hashedPassword });

        // when
        const user = new User({
          id: 1,
          authenticationMethods: [pixAuthenticationMethod],
        });

        // then
        expect(user.passwordHash).to.equal(hashedPassword);
      });
    });

    context('when there is no Pix authentication method', function () {
      it('returns null', function () {
        // given
        const poleEmploiAuthenticationMethod =
          domainBuilder.buildAuthenticationMethod.withPoleEmploiAsIdentityProvider();

        // when
        const user = new User({
          id: 1,
          authenticationMethods: [poleEmploiAuthenticationMethod],
        });

        // then
        expect(user.passwordHash).to.be.null;
      });
    });
  });

  describe('#shouldSeeDataProtectionPolicyInformationBanner', function () {
    context('when user has not seen data protection policy but data protection date is not setted', function () {
      it('should return false', function () {
        // given
        config.dataProtectionPolicy.updateDate = null;
        const user = new User({ lastDataProtectionPolicySeenAt: null }, dependencies);

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.false;
      });
    });

    context('when user has not seen data protection policy and data protection has been updated', function () {
      it('should return true', function () {
        // given
        config.dataProtectionPolicy.updateDate = new Date();
        const user = new User({ lastDataProtectionPolicySeenAt: null, cgu: true }, dependencies);

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.true;
      });

      it('should return false for an organization learner', function () {
        // given
        config.dataProtectionPolicy.updateDate = new Date();
        const user = new User({ lastDataProtectionPolicySeenAt: null, cgu: false }, dependencies);

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.false;
      });
    });

    context('when user has seen data protection policy but data protection date is not setted', function () {
      it('should return false', function () {
        // given
        config.dataProtectionPolicy.updateDate = null;
        const user = new User({ lastDataProtectionPolicySeenAt: new Date(), cgu: true }, dependencies);

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.false;
      });

      it('should return false for an organization learner', function () {
        // given
        config.dataProtectionPolicy.updateDate = null;
        const user = new User({ lastDataProtectionPolicySeenAt: new Date(), cgu: false }, dependencies);

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.false;
      });
    });

    context('when user has seen data protection policy but data protection has not been updated since', function () {
      it('should return false', function () {
        // given
        config.dataProtectionPolicy.updateDate = new Date();
        const user = new User(
          { lastDataProtectionPolicySeenAt: new Date(Date.now() + 3600 * 1000), cgu: true },
          dependencies,
        );

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.false;
      });

      it('should return false for an organization learner', function () {
        // given
        config.dataProtectionPolicy.updateDate = new Date();
        const user = new User(
          { lastDataProtectionPolicySeenAt: new Date(Date.now() + 3600 * 1000), cgu: false },
          dependencies,
        );

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.false;
      });
    });

    context('when user has seen data protection policy but data protection has been updated', function () {
      it('should return true', function () {
        // given
        config.dataProtectionPolicy.updateDate = new Date(Date.now() + 3600 * 1000);
        const user = new User({ lastDataProtectionPolicySeenAt: new Date(), cgu: true }, dependencies);

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.true;
      });

      it('should return false for an organization learner', function () {
        // given
        config.dataProtectionPolicy.updateDate = new Date(Date.now() + 3600 * 1000);
        const user = new User({ lastDataProtectionPolicySeenAt: new Date(), cgu: false }, dependencies);

        // then
        expect(user.shouldSeeDataProtectionPolicyInformationBanner).to.be.false;
      });
    });
  });

  describe('#markEmailAsValid', function () {
    let clock, now;

    beforeEach(function () {
      now = new Date('2024-06-11');
      clock = sinon.useFakeTimers({ now, toFake: ['Date'] });
    });

    afterEach(function () {
      clock.restore();
    });

    it('marks user email as valid by setting a date on "emailConfirmedAt" attribute', function () {
      // given
      const user = domainBuilder.buildUser();

      // when
      user.markEmailAsValid();

      // then
      expect(user.emailConfirmedAt).to.be.a('Date');
      expect(user.emailConfirmedAt).to.deep.equal(now);
    });
  });

  describe('#mapToDatabaseDto', function () {
    it('maps user model into user database DTO', function () {
      // given
      const expectedAttributes = [
        'id',
        'createdAt',
        'updatedAt',
        'firstName',
        'lastName',
        'username',
        'email',
        'emailConfirmedAt',
        'cgu',
        'lastTermsOfServiceValidatedAt',
        'lastPixOrgaTermsOfServiceValidatedAt',
        'lastPixCertifTermsOfServiceValidatedAt',
        'lastDataProtectionPolicySeenAt',
        'mustValidateTermsOfService',
        'pixOrgaTermsOfServiceAccepted',
        'pixCertifTermsOfServiceAccepted',
        'hasSeenAssessmentInstructions',
        'hasSeenOtherChallengesTooltip',
        'hasSeenNewDashboardInfo',
        'hasSeenFocusedChallengeTooltip',
        'lang',
        'locale',
        'isAnonymous',
        'hasBeenAnonymised',
        'hasBeenAnonymisedBy',
      ];
      const user = domainBuilder.buildUser();

      // when
      const dto = user.mapToDatabaseDto();
      const attributes = Object.keys(dto);

      // then
      expect(attributes).to.deep.equal(expectedAttributes);
    });
  });

  describe('#anonymize', function () {
    it('anonymizes user info', function () {
      // given
      const adminId = 1;
      const user = new User({
        id: 1000,
        createdAt: new Date('2012-12-12T12:12:12Z'),
        updatedAt: new Date('2023-03-23T23:23:23Z'),
      });

      // when
      const anonymizedUser = user.anonymize(adminId);

      // then
      expect(anonymizedUser.id).to.be.equal(1000);
      expect(anonymizedUser.firstName).to.equal('(anonymised)');
      expect(anonymizedUser.lastName).to.equal('(anonymised)');
      expect(anonymizedUser.email).to.be.null;
      expect(anonymizedUser.emailConfirmedAt).to.be.null;
      expect(anonymizedUser.username).to.be.null;
      expect(anonymizedUser.hasBeenAnonymised).to.be.true;
      expect(anonymizedUser.hasBeenAnonymisedBy).to.equal(adminId);
      expect(anonymizedUser.lastTermsOfServiceValidatedAt).to.be.null;
      expect(anonymizedUser.lastPixOrgaTermsOfServiceValidatedAt).to.be.null;
      expect(anonymizedUser.lastPixCertifTermsOfServiceValidatedAt).to.be.null;
      expect(anonymizedUser.lastDataProtectionPolicySeenAt).to.be.null;
      expect(anonymizedUser.createdAt.toISOString()).to.equal('2012-12-01T00:00:00.000Z');
      expect(anonymizedUser.updatedAt.toISOString()).to.equal('2023-03-01T00:00:00.000Z');
    });
  });

  describe('#has', function () {
    it('should return false when user has no organization learner ids at all', function () {
      // given
      const user = domainBuilder.certification.enrolment.buildUser({ organizationLearnerIds: [] });

      // when
      const hasOrgaLearnerId = user.has({ organizationLearnerId: 123 });

      // then
      expect(hasOrgaLearnerId).to.be.false;
    });

    it('should return false when user does not have the given organizationLearnerId in its ids', function () {
      // given
      const user = domainBuilder.certification.enrolment.buildUser({ organizationLearnerIds: [456, 789] });

      // when
      const hasOrgaLearnerId = user.has({ organizationLearnerId: 123 });

      // then
      expect(hasOrgaLearnerId).to.be.false;
    });

    it('should return true when user has the given organizationLearnerId in its ids', function () {
      // given
      const user = domainBuilder.certification.enrolment.buildUser({ organizationLearnerIds: [456, 789, 123] });

      // when
      const hasOrgaLearnerId = user.has({ organizationLearnerId: 123 });

      // then
      expect(hasOrgaLearnerId).to.be.true;
    });
  });
});
