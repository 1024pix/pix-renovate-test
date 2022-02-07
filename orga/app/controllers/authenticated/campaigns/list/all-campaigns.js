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
    return filtersAreEmpty;
  }

  updateFilters(filters) {
    Object.keys(filters).forEach((filterKey) => (this[filterKey] = filters[filterKey]));
    this.pageNumber = null;
  }

  @action
  clearFilters() {
    this.name = null;
    this.ownerName = null;
    this.status = null;
  }

  @action
  triggerFiltering(fieldName, value) {
    this[fieldName] = value;
    this.pageNumber = null;
  }

  @action
  updateCampaignStatus(newStatus) {
    this.status = newStatus;
  }

  @action
  goToCampaignPage(campaignId, event) {
    event.preventDefault();
    event.stopPropagation();
    this.transitionToRoute('authenticated.campaigns.campaign', campaignId);
  }
}
