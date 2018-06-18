const TargetProfile = require('../../../../lib/domain/models/TargetProfile');
const Skill = require('../../../../lib/domain/models/Skill');
const { expect } = require('../../../test-helper');

describe('Unit | Domain | Models | TargetProfile', () => {

  describe('#constructor', () => {
    it('should build a TargetProfile with default list of targetSkillNames', () => {
      // given
      const expectedSkills = [
        new Skill({ name: '@accesDonnées2' }),
        new Skill({ name: '@accesDonnées1' }),
        new Skill({ name: '@collecteDonnées2' }),
        new Skill({ name: '@collecteDonnées1' }),
        new Skill({ name: '@infosPerso4' }),
        new Skill({ name: '@infosPerso3' }),
        new Skill({ name: '@infosPerso2' }),
        new Skill({ name: '@infosPerso1' }),
        new Skill({ name: '@tracesLocales3' }),
        new Skill({ name: '@tracesLocales2' }),
        new Skill({ name: '@tracesLocales1' }),
        new Skill({ name: '@tracesPratiques6' }),
        new Skill({ name: '@tracesPratiques5' }),
        new Skill({ name: '@tracesPratiques4' }),
        new Skill({ name: '@tracesPratiques3' }),
        new Skill({ name: '@tracesPratiques2' }),
        new Skill({ name: '@tracesPratiques1' }),
        new Skill({ name: '@archive4' }),
        new Skill({ name: '@archive3' }),
        new Skill({ name: '@archive2' }),
        new Skill({ name: '@archive1' }),
        new Skill({ name: '@fichier1' }),
        new Skill({ name: '@propFichier3' }),
        new Skill({ name: '@propFichier2' }),
        new Skill({ name: '@propFichier1' }),
        new Skill({ name: '@sauvegarde6' }),
        new Skill({ name: '@sauvegarde5' }),
        new Skill({ name: '@sauvegarde4' }),
        new Skill({ name: '@sauvegarde3' }),
        new Skill({ name: '@sauvegarde2' }),
        new Skill({ name: '@sauvegarde1' }),
        new Skill({ name: '@unite2' }),
        new Skill({ name: '@unite1' }),
      ];

      // when
      const targetProfile = TargetProfile.TEST_PROFIL;

      // then
      expect(targetProfile).to.be.an.instanceOf(TargetProfile);
      expect(targetProfile.skills).to.deep.equal(expectedSkills);
    });

    it('should complete targeted skills with all easier skills', () => {
      // given
      const skills = [new Skill({ name: '@web2' })];
      const expectedSkills = [new Skill({ name: '@web2' }), new Skill({ name: '@web1' })];

      // when
      const targetProfile = new TargetProfile({ skills });

      // then
      expect(targetProfile.skills).to.deep.equal(expectedSkills);
    });

    it('should not generate duplicate skills', () => {
      // given
      const skills = [new Skill({ name: '@web3' }), new Skill({ name: '@web2' })];
      const expectedSkills = [new Skill({ name: '@web3' }), new Skill({ name: '@web2' }), new Skill({ name: '@web1' })];

      // when
      const targetProfile = new TargetProfile({ skills });

      // then
      expect(targetProfile.skills).to.deep.equal(expectedSkills);
    });

  });

});
