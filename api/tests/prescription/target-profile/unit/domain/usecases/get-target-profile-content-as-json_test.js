import { getTargetProfileContentAsJson } from '../../../../../../src/prescription/target-profile/domain/usecases/get-target-profile-content-as-json.js';
import { domainBuilder, expect, MockDate, sinon } from '../../../../../test-helper.js';

describe('Unit | UseCase | get-target-profile-content-as-json', function () {
  let targetProfileAdministrationRepository;
  let learningContentConversionService;

  beforeEach(function () {
    learningContentConversionService = { findActiveSkillsForCappedTubes: sinon.stub() };
  });

  afterEach(function () {
    MockDate.reset();
  });

  context('when the user has the authorization to get the content', function () {
    beforeEach(function () {
      MockDate.set(new Date('2020-12-01'));
      const area = domainBuilder.buildArea({ id: 'recArea', frameworkId: 'recFramework' });
      const targetProfileForAdmin = domainBuilder.buildTargetProfileForAdmin({
        name: 'Profil Rentrée scolaire',
        areas: [area],
        competences: [domainBuilder.buildCompetence({ id: 'recCompetence', area, areaId: area.id })],
        thematics: [
          domainBuilder.buildThematic({ id: 'recThematic1', competenceId: 'recCompetence' }),
          domainBuilder.buildThematic({ id: 'recThematic2', competenceId: 'recCompetence' }),
        ],
        tubesWithLevelThematicMobileAndTablet: [
          {
            ...domainBuilder.buildTube({ id: 'recTube1' }),
            thematicId: 'recThematic1',
            level: 8,
          },
          {
            ...domainBuilder.buildTube({ id: 'recTube3' }),
            thematicId: 'recThematic2',
            level: 1,
          },
          {
            ...domainBuilder.buildTube({ id: 'recTube2' }),
            thematicId: 'recThematic1',
            level: 7,
          },
        ],
      });
      targetProfileAdministrationRepository = { get: sinon.stub() };
      targetProfileAdministrationRepository.get.withArgs({ id: 123 }).resolves(targetProfileForAdmin);
      const skillsForTube1 = [domainBuilder.buildSkill({ id: 'skill1Tube1', tubeId: 'recTube1' })];
      const skillsForTube2 = [
        domainBuilder.buildSkill({ id: 'skill1Tube2', tubeId: 'recTube2' }),
        domainBuilder.buildSkill({ id: 'skill2Tube2', tubeId: 'recTube2' }),
      ];
      const skillsForTube3 = [];
      learningContentConversionService.findActiveSkillsForCappedTubes
        .withArgs([
          {
            id: 'recTube1',
            level: 8,
          },
          {
            id: 'recTube2',
            level: 7,
          },
          {
            id: 'recTube3',
            level: 1,
          },
        ])
        .resolves([...skillsForTube1, ...skillsForTube2, ...skillsForTube3]);
    });

    it('should return the json content and the filename for the target profile to export', async function () {
      // when
      const { jsonContent, targetProfileName } = await getTargetProfileContentAsJson({
        userId: 66,
        targetProfileId: 123,
        targetProfileAdministrationRepository,
        learningContentConversionService,
      });

      // then
      expect(targetProfileName).to.equal('Profil Rentrée scolaire');
      expect(jsonContent).to.equal(
        '[{"id":"recTube1","level":8,"frameworkId":"recFramework","skills":["skill1Tube1"]},{"id":"recTube2","level":7,"frameworkId":"recFramework","skills":["skill1Tube2","skill2Tube2"]},{"id":"recTube3","level":1,"frameworkId":"recFramework","skills":[]}]',
      );
    });
  });
});
