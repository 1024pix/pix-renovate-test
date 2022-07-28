import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

const DEFAULT_PAGE_NUMBER = 1;

export default class AuthenticatedCampaignsListAllCampaignsController extends Controller {
  @tracked pageNumber = DEFAULT_PAGE_NUMBER;
  @tracked pageSize = 25;
  @tracked name = '';
  @tracked ownerName = '';
  @tracked status = null;

  get isArchived() {
    return this.status === 'archived';
  }

  get isClearFiltersButtonDisabled() {
    const filtersAreEmpty = !this.name && !this.ownerName;
    const activeCampainsDisplayed = this.status === null;
    return filtersAreEmpty && activeCampainsDisplayed;
  }

  @action
  clearFilters() {
    this.name = '';
    this.ownerName = '';
    this.status = null;
  }

  @action
  triggerFiltering(fieldName, value) {
    this[fieldName] = value;
    this.pageNumber = null;
  }

  @action
  goToCampaignPage(campaignId, event) {
    event.preventDefault();
    event.stopPropagation();
    this.transitionToRoute('authenticated.campaigns.campaign', campaignId);
  }
}
