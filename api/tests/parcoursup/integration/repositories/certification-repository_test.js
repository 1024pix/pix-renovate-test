import * as certificationRepository from '../../../../../api/src/parcoursup/infrastructure/repositories/certification-repository.js';
import { NotFoundError } from '../../../../src/shared/domain/errors.js';
import { catchErr, datamartBuilder, domainBuilder, expect } from '../../../test-helper.js';

describe('Parcoursup | Infrastructure | Integration | Repositories | certification', function () {
  describe('#get', function () {
    describe('when a certification is found', function () {
      it('should return the certification', async function () {
        // given
        const ine = '1234';
        const certificationResultData = {
          nationalStudentId: ine,
          organizationUai: 'UAI ETAB ELEVE',
          lastName: 'NOM-ELEVE',
          firstName: 'PRENOM-ELEVE',
          birthdate: '2000-01-01',
          status: 'validated',
          pixScore: 327,
          certificationDate: '2024-11-22T09:39:54',
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

        // when
        const result = await certificationRepository.get({ ine });

        // then
        const expectedCertification = domainBuilder.parcoursup.buildCertificationResult({
          ine,
          organizationUai: 'UAI ETAB ELEVE',
          lastName: 'NOM-ELEVE',
          firstName: 'PRENOM-ELEVE',
          birthdate: '2000-01-01',
          status: 'validated',
          pixScore: 327,
          certificationDate: new Date('2024-11-22T09:39:54Z'),
          competences: [
            {
              id: 'xzef1223443',
              level: 3,
            },
            {
              id: 'otherCompetenceId',
              level: 5,
            },
          ],
        });
        expect(result).to.deep.equal(expectedCertification);
      });
    });

    describe('when no certifications are found for given ine', function () {
      it('should throw Not Found Error', async function () {
        // given
        const ine = '1234';

        // when
        const err = await catchErr(certificationRepository.get)({ ine });

        // then
        expect(err).to.be.instanceOf(NotFoundError);
        expect(err.message).to.deep.equal('No certifications found for given INE');
      });
    });
  });
});
