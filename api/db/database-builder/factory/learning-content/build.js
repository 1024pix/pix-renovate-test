import { buildArea } from './build-area.js';
import { buildChallenge } from './build-challenge.js';
import { buildCompetence } from './build-competence.js';
import { buildCourse } from './build-course.js';
import { buildFramework } from './build-framework.js';
import { buildMission } from './build-mission.js';
import { buildSkill } from './build-skill.js';
import { buildThematic } from './build-thematic.js';
import { buildTube } from './build-tube.js';
import { buildTutorial } from './build-tutorial.js';

let nock;

export function build(learningContent) {
  learningContent.frameworks?.forEach(buildFramework);
  learningContent.areas?.forEach(buildArea);
  learningContent.competences?.forEach(buildCompetence);
  learningContent.thematics?.forEach(buildThematic);
  learningContent.tubes?.forEach(buildTube);
  learningContent.skills?.forEach(buildSkill);
  learningContent.challenges?.forEach(buildChallenge);
  learningContent.courses?.forEach(buildCourse);
  learningContent.tutorials?.forEach(buildTutorial);
  learningContent.missions?.forEach(buildMission);

  return nock?.('https://lcms-test.pix.fr/api')
    .get('/releases/latest')
    .matchHeader('Authorization', 'Bearer test-api-key')
    .reply(200, { content: learningContent });
}

export function injectNock(value) {
  nock = value;
}
