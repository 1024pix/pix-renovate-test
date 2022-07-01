const { expect, knex, sinon } = require('../../../test-helper');
const {
  main,
  databaseBuilder: databaseBuilderCli,
} = require('../../../../scripts/data-generation/generate-certif-cli');
const skillRepository = require('../../../../lib/infrastructure/repositories/skill-repository');
const competenceRepository = require('../../../../lib/infrastructure/repositories/competence-repository');
const challengeRepository = require('../../../../lib/infrastructure/repositories/challenge-repository');
const databaseBuffer = require('../../../../db/database-builder/database-buffer');

describe('Integration | Scripts | generate-certif-cli.js', function () {
  const certificationCenterSup = { id: 3, type: 'SUP' };
  const certificationCenterPro = { id: 2, type: 'PRO' };
  const certificationCenterSco = {
    id: 1,
    type: 'SCO',
    externalId: 'SCOID',
  };

  beforeEach(async function () {
    sinon.stub(skillRepository, 'findActiveByCompetenceId').resolves([]);
    sinon.stub(competenceRepository, 'list').resolves([]);
    sinon.stub(challengeRepository, 'list').resolves([]);
  });

  afterEach(function () {
    //A we use the script databasebuilder, we have to clean it manually
    return databaseBuilderCli.clean();
  });

  describe('#main', function () {
    context('when asking for 2 candidates', function () {
      // eslint-disable-next-line mocha/no-setup-in-describe
      [certificationCenterSup, certificationCenterPro].forEach(({ id: certificationCenterId, type }) => {
        context(`when asking for ${type}`, function () {
          it(`should create 2 ${type} candidates`, async function () {
            // given
            databaseBuffer.nextId = 0;
            buildTypedCertificationCenters();
            buildComplementaryCertifications();
            await databaseBuilderCli.commit();

            // when
            await main({
              centerType: type,
              candidateNumber: 2,
              complementaryCertifications: false,
              isSupervisorAccessEnabled: false,
            });

            // then
            const session = await knex('sessions').select('id', 'certificationCenterId', 'accessCode').first();
            const user = await knex('users').select('id').orderBy('id', 'asc').first();
            const hasAuthenticationMethod = !!(await knex('authentication-methods')
              .select(1)
              .where({ userId: user.id })
              .first());
            const certificationCandidates = await knex('certification-candidates').select(
              'birthdate',
              'firstName',
              'lastName',
              'sessionId',
              'email'
            );
            expect(session.accessCode).to.exist;
            expect(session.certificationCenterId).to.equal(certificationCenterId);
            expect(hasAuthenticationMethod).to.exist;
            expect(certificationCandidates).to.have.length(2);
            const name = `${type}1`.toLowerCase();
            expect(certificationCandidates[0]).to.deep.equals({
              birthdate: '2000-01-01',
              firstName: name,
              lastName: name,
              sessionId: session.id,
              email: `${name}@example.net`,
            });
          });
        });
      });

      context(`when asking for SCO`, function () {
        it('should create 2 SCO candidates', async function () {
          // given
          databaseBuffer.nextId = 0;
          buildTypedCertificationCenters();
          buildComplementaryCertifications();
          await databaseBuilderCli.commit();
          databaseBuilderCli.factory.buildOrganization({ id: 1, externalId: certificationCenterSco.externalId });
          databaseBuilderCli.factory.buildOrganizationLearner({
            organizationId: 1,
            userId: null,
          });
          databaseBuilderCli.factory.buildOrganizationLearner({ organizationId: 1, userId: null });
          await databaseBuilderCli.commit();
          await databaseBuilderCli.fixSequences();

          // when
          await main({
            centerType: 'SCO',
            candidateNumber: 2,
            complementaryCertifications: false,
            isSupervisorAccessEnabled: false,
          });

          // then
          const session = await knex('sessions').select('id', 'certificationCenterId', 'accessCode').first();
          const user = await knex('users').select('id').orderBy('id', 'asc').first();
          const hasAuthenticationMethod = !!(await knex('authentication-methods')
            .select(1)
            .where({ userId: user.id })
            .first());
          const certificationCandidates = await knex('certification-candidates').select(
            'birthdate',
            'firstName',
            'lastName',
            'sessionId',
            'email'
          );

          expect(session.accessCode).to.exist;
          expect(session.certificationCenterId).to.equal(1);
          expect(hasAuthenticationMethod).to.exist;
          expect(certificationCandidates).to.have.length(2);
          expect(certificationCandidates[0]).to.deep.equals({
            birthdate: '2000-01-01',
            firstName: 'sco1',
            lastName: 'sco1',
            sessionId: session.id,
            email: 'sco1@example.net',
          });
        });
      });
    });
  });

  function buildTypedCertificationCenters() {
    databaseBuilderCli.factory.buildCertificationCenter(certificationCenterSco);
    databaseBuilderCli.factory.buildCertificationCenter(certificationCenterPro);
    databaseBuilderCli.factory.buildCertificationCenter(certificationCenterSup);
  }

  function buildComplementaryCertifications() {
    databaseBuilderCli.factory.buildComplementaryCertification({ id: 52 });
    databaseBuilderCli.factory.buildComplementaryCertification({ id: 53 });
    databaseBuilderCli.factory.buildComplementaryCertification({ id: 54 });
    databaseBuilderCli.factory.buildComplementaryCertification({ id: 55 });
  }
});
