import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  urlForQuery(query) {
    if (query.filter.organizationId) {
      const { organizationId } = query.filter;
      delete query.filter.organizationId;

      return `${this.host}/${this.namespace}/organizations/${organizationId}/campaigns`;
    }
    return this._super(...arguments);
  },
  archive(model) {
    const url = this.buildURL('campaign', model.id) + '/archive';
    return this.ajax(url, 'PUT');
  },
  unarchive(model) {
    const url = this.buildURL('campaign', model.id) + '/archive';
    return this.ajax(url, 'DELETE');
  },

});
