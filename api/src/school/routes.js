import * as assessment from './application/assessment-route.js';
import * as organizationLearner from './application/organization-learner-route.js';
import * as school from './application/school-route.js';
const schoolRoutes = [assessment, school, organizationLearner];

export { schoolRoutes };
