import {
  createServer,
  databaseBuilder,
  datamartBuilder,
  expect,
  generateValidRequestAuthorizationHeaderForApplication,
} from '../../../test-helper.js';

describe('Parcoursup | Acceptance | Application | certification-route', function () {
  let server;

  const PARCOURSUP_CLIENT_ID = 'parcoursupClientId';
  const PARCOURSUP_SCOPE = 'parcoursup';
  const PARCOURSUP_SOURCE = 'parcoursup';

  beforeEach(async function () {
    server = await createServer();
  });

  describe('GET /api/parcoursup/students/{ine}/certification', function () {
    it('should return 200 HTTP status code and a certification for a given INE', async function () {
      // given
      const ine = '123456789OK';
      const certificationResultData = {
        nationalStudentId: ine,
        organizationUai: 'UAI ETAB ELEVE',
        lastName: 'NOM-ELEVE',
        firstName: 'PRENOM-ELEVE',
        birthdate: '2000-01-01',
        status: 'validated',
        pixScore: 327,
        certificationDate: '2024-11-22T09:39:54Z',
      };
      datamartBuilder.factory.buildCertificationResult({
        ...certificationResultData,
        competenceId: 'xzef1223443',
        competenceLevel: 3,
      });
      datamartBuilder.factory.buildCertificationResult({
        ...certificationResultData,
        competenceId: 'otherCompetenceId',
        competenceLevel: 5,
      });
      await datamartBuilder.commit();

      const options = {
        method: 'GET',
        url: `/api/parcoursup/students/${ine}/certification`,
        headers: {
          authorization: generateValidRequestAuthorizationHeaderForApplication(
            PARCOURSUP_CLIENT_ID,
            PARCOURSUP_SOURCE,
            PARCOURSUP_SCOPE,
          ),
        },
      };

      await databaseBuilder.commit();

      const expectedCertification = {
        organizationUai: 'UAI ETAB ELEVE',
        ine,
        lastName: 'NOM-ELEVE',
        firstName: 'PRENOM-ELEVE',
        birthdate: '2000-01-01',
        status: 'validated',
        pixScore: 327,
        certificationDate: new Date('2024-11-22T09:39:54Z'),
        competences: [
          {
            // TODO ask DataTeam to add code and label (1.1 Mener une recherche et une veille d’information)
            id: 'xzef1223443',
            level: 3,
          },
          {
            id: 'otherCompetenceId',
            level: 5,
          },
        ],
      };

      // when
      const response = await server.inject(options);

      // then
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.deep.equal(expectedCertification);
    });
  });
});
