import { skillRepository } from '../../../../../src/learning-content/infrastructure/repositories/skill-repository.js';
import { databaseBuilder, expect, knex } from '../../../../test-helper.js';

describe('Learning Content | Integration | Repositories | Skill', function () {
  afterEach(async function () {
    await knex('learningcontent.skills').truncate();
  });

  describe('#save', function () {
    it('should insert skills', async function () {
      // given
      const skillDtos = [
        {
          id: 'skill1',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'périmé',
          tubeId: 'tube1',
          version: 1,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill1v2',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 2,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill2',
          name: '@cuiredespates3',
          hintStatus: 'validé',
          tutorialIds: ['tuto3'],
          learningMoreTutorialIds: ['tutoMore2', 'tutoMore3'],
          pixValue: 20000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 1,
          level: 3,
          hint_i18n: {
            fr: 'Elle doivent être al dente',
            en: 'These need to be al dente',
            nl: 'Aflugeublik al dente',
          },
        },
      ];

      // when
      await skillRepository.save(skillDtos);

      // then
      const savedSkills = await knex.select('*').from('learningcontent.skills').orderBy('name');

      expect(savedSkills).to.deep.equal([
        {
          id: 'skill1',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'périmé',
          tubeId: 'tube1',
          version: 1,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill1v2',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 2,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill2',
          name: '@cuiredespates3',
          hintStatus: 'validé',
          tutorialIds: ['tuto3'],
          learningMoreTutorialIds: ['tutoMore2', 'tutoMore3'],
          pixValue: 20000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 1,
          level: 3,
          hint_i18n: {
            fr: 'Elle doivent être al dente',
            en: 'These need to be al dente',
            nl: 'Aflugeublik al dente',
          },
        },
      ]);
    });
  });

  describe('when some skills already exist', function () {
    it('should upsert skills and keep missing ones', async function () {
      // given
      databaseBuilder.factory.learningContent.buildSkill({
        id: 'skill1',
        name: '@cuiredespates2',
        hintStatus: 'pré-validé',
        tutorialIds: ['tuto1', 'tuto2'],
        learningMoreTutorialIds: ['tutoMore1'],
        pixValue: 10000,
        competenceId: 'competence1',
        status: 'actif',
        tubeId: 'tube1',
        version: 1,
        level: 2,
        hint_i18n: {
          fr: 'Il faut une casserolle d’eau chaude',
          en: 'A casserolle of hot water is needed',
          nl: 'Aflugeublik',
        },
      });
      databaseBuilder.factory.learningContent.buildSkill({
        id: 'skill2',
        name: '@cuiredespates3',
        hintStatus: 'validé',
        tutorialIds: [],
        learningMoreTutorialIds: [],
        pixValue: 0,
        competenceId: 'competence1',
        status: 'actif',
        tubeId: 'tube1',
        version: 1,
        level: 3,
        hint_i18n: {
          fr: 'Elle doivent être cuite à point',
          en: 'These need to be cuite à point',
          nl: 'Aflugeublik cuite à point',
        },
      });
      databaseBuilder.factory.learningContent.buildSkill({
        id: 'skillDinosaure',
        name: '@dinosaure1',
        hintStatus: 'validé',
        tutorialIds: ['tutoDino'],
        learningMoreTutorialIds: ['tutoMoreDino'],
        pixValue: 666,
        competenceId: 'competenceDino',
        status: 'actif',
        tubeId: 'tubeDino',
        version: 1,
        level: 1,
        hint_i18n: {
          fr: 'Dinosaure',
          en: 'Dinosaur',
          nl: 'Dinosaurus',
        },
      });

      const skillDtos = [
        {
          id: 'skill1',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'périmé',
          tubeId: 'tube1',
          version: 1,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill1v2',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 2,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill2',
          name: '@cuiredespates3',
          hintStatus: 'validé',
          tutorialIds: ['tuto3'],
          learningMoreTutorialIds: ['tutoMore2', 'tutoMore3'],
          pixValue: 20000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 1,
          level: 3,
          hint_i18n: {
            fr: 'Elle doivent être al dente',
            en: 'These need to be al dente',
            nl: 'Aflugeublik al dente',
          },
        },
      ];
      await databaseBuilder.commit();

      // when
      await skillRepository.save(skillDtos);

      // then
      const savedSkills = await knex.select('*').from('learningcontent.skills').orderBy('name');

      expect(savedSkills).to.deep.equal([
        {
          id: 'skill1',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'périmé',
          tubeId: 'tube1',
          version: 1,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill1v2',
          name: '@cuiredespates2',
          hintStatus: 'pré-validé',
          tutorialIds: ['tuto1', 'tuto2'],
          learningMoreTutorialIds: ['tutoMore1'],
          pixValue: 10000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 2,
          level: 2,
          hint_i18n: {
            fr: 'Il faut une casserolle d’eau chaude',
            en: 'A casserolle of hot water is needed',
            nl: 'Aflugeublik',
          },
        },
        {
          id: 'skill2',
          name: '@cuiredespates3',
          hintStatus: 'validé',
          tutorialIds: ['tuto3'],
          learningMoreTutorialIds: ['tutoMore2', 'tutoMore3'],
          pixValue: 20000,
          competenceId: 'competence1',
          status: 'actif',
          tubeId: 'tube1',
          version: 1,
          level: 3,
          hint_i18n: {
            fr: 'Elle doivent être al dente',
            en: 'These need to be al dente',
            nl: 'Aflugeublik al dente',
          },
        },
        {
          id: 'skillDinosaure',
          name: '@dinosaure1',
          hintStatus: 'validé',
          tutorialIds: ['tutoDino'],
          learningMoreTutorialIds: ['tutoMoreDino'],
          pixValue: 666,
          competenceId: 'competenceDino',
          status: 'actif',
          tubeId: 'tubeDino',
          version: 1,
          level: 1,
          hint_i18n: {
            fr: 'Dinosaure',
            en: 'Dinosaur',
            nl: 'Dinosaurus',
          },
        },
      ]);
    });
  });
});
