const { expect, domainBuilder, sinon } = require('../../../../test-helper');
const skillRepository = require('../../../../../lib/infrastructure/repositories/skill-repository');
const {
  findActiveSkillsForCappedTubes,
} = require('../../../../../lib/domain/services/learning-content/learning-content-conversion-service');

describe('Unit | Service | learning-content-conversion-service', function () {
  describe('#findOperativeSkillsForCappedTubes', function () {
    it('should find all skills of provided tubes capped by difficulty', async function () {
      // given
      const cappedTubes = [
        {
          id: 'recTube1',
          level: '3',
        },
        {
          id: 'recTube2',
          level: '4',
        },
      ];
      const skill1Tube1 = domainBuilder.buildSkill({ tubeId: 'recTube1', name: '@skillTube1_1' });
      const skill2Tube1 = domainBuilder.buildSkill({ tubeId: 'recTube1', name: '@skillTube1_2' });
      const skill6Tube1 = domainBuilder.buildSkill({ tubeId: 'recTube1', name: '@skillTube1_6' });
      const skill2Tube2 = domainBuilder.buildSkill({ tubeId: 'recTube2', name: '@skillTube2_2' });
      const skill4Tube2 = domainBuilder.buildSkill({ tubeId: 'recTube2', name: '@skillTube2_4' });
      sinon.stub(skillRepository, 'findActiveByTubeId');
      skillRepository.findActiveByTubeId.withArgs('recTube1').resolves([skill1Tube1, skill2Tube1, skill6Tube1]);
      skillRepository.findActiveByTubeId.withArgs('recTube2').resolves([skill2Tube2, skill4Tube2]);
      skillRepository.findActiveByTubeId.throws(new Error('I should not be called with other arguments'));

      // when
      const skills = await findActiveSkillsForCappedTubes(cappedTubes);

      // then
      expect(skills).to.deepEqualArray([skill1Tube1, skill2Tube1, skill2Tube2, skill4Tube2]);
    });
  });
});
