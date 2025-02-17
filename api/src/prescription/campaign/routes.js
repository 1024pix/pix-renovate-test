import * as campaignAdministration from './application/campaign-administration-route.js';
import * as campaignDetail from './application/campaign-detail-route.js';
import * as campaignResults from './application/campaign-results-route.js';
import * as campaign from './application/campaign-route.js';
import * as campaignStats from './application/campaign-stats-route.js';

const campaignRoutes = [campaign, campaignAdministration, campaignDetail, campaignResults, campaignStats];

export { campaignRoutes };
