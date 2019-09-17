const { expect, sinon } = require('../../../../test-helper');
const airtable = require('../../../../../lib/infrastructure/airtable');
const competenceDatasource = require('../../../../../lib/infrastructure/datasources/airtable/competence-datasource');
const competenceRawAirTableFixture = require('../../../../tooling/fixtures/infrastructure/competenceRawAirTableFixture');
const airTableDataModels = require('../../../../../lib/infrastructure/datasources/airtable/objects');

describe('Unit | Infrastructure | Datasource | Airtable | CompetenceDatasource', () => {

  describe('#get', () => {

    it('should call airtable on Competences table with the id and return a Competence data object', async () => {
      // given
      sinon.stub(airtable, 'getRecord')
        .withArgs('Competences', 'recsvLz0W2ShyfD63')
        .resolves(competenceRawAirTableFixture());

      // when
      const competence = await competenceDatasource.get('recsvLz0W2ShyfD63');

      // then
      expect(competence).to.be.an.instanceof(airTableDataModels.Competence);
      expect(competence.id).to.equal('recsvLz0W2ShyfD63');
      expect(competence.name).to.equal('Mener une recherche et une veille d’information');
    });
  });

  describe('#list', () => {

    it('should call airtable on Competences table to retrieve all Competences', async () => {
      // given
      sinon.stub(airtable, 'findRecords')
        .withArgs('Competences', airTableDataModels.Competence.getUsedAirtableFields())
        .resolves([ competenceRawAirTableFixture() ]);

      // when
      const competences = await competenceDatasource.list();

      // then
      expect(competences[0]).to.be.an.instanceof(airTableDataModels.Competence);
      expect(competences[0].id).to.equal('recsvLz0W2ShyfD63');
      expect(competences[0].name).to.equal('Mener une recherche et une veille d’information');
    });
  });
});
