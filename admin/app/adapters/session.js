import queryString from 'query-string';

import ApplicationAdapter from './application';

export default class SessionAdapter extends ApplicationAdapter {
  urlForQuery() {
    return `${this.host}/${this.namespace}/admin/sessions`;
  }

  findHasMany(store, snapshot, url, relationship) {
    url = this.urlPrefix(url, this.buildURL(snapshot.modelName, snapshot.id, null, 'findHasMany'));
    if (relationship.type === 'jury-certification-summary' && snapshot.adapterOptions) {
      const options = queryString.stringify(snapshot.adapterOptions);
      url += '?' + options;
    }

    return this.ajax(url, 'GET');
  }

  urlForFindRecord(id) {
    return `${this.host}/${this.namespace}/admin/sessions/${id}`;
  }

  urlForUpdateRecord(id) {
    return `${this.host}/${this.namespace}/admin/sessions/${id}`;
  }

  getDownloadLink({ id, lang }) {
    const link = `${this.host}/${this.namespace}/admin/sessions/${id}/generate-results-download-link?lang=${lang}`;
    return this.ajax(link, 'GET');
  }

  updateRecord(store, type, snapshot) {
    if (snapshot.adapterOptions.updatePublishedCertifications) {
      let url;
      if (snapshot.adapterOptions.toPublish) {
        url = this.urlForUpdateRecord(snapshot.id, type.modelName, snapshot) + '/publish';
      } else {
        url = this.urlForUpdateRecord(snapshot.id, type.modelName, snapshot) + '/unpublish';
      }
      return this.ajax(url, 'PATCH');
    } else if (snapshot.adapterOptions.certificationOfficerAssignment) {
      const url = this.urlForUpdateRecord(snapshot.id, type.modelName, snapshot) + '/certification-officer-assignment';
      return this.ajax(url, 'PATCH');
    } else if (snapshot.adapterOptions.unfinalize) {
      const url = this.urlForUpdateRecord(snapshot.id, type.modelName, snapshot) + '/unfinalize';
      return this.ajax(url, 'PATCH');
    } else if (snapshot.adapterOptions.isComment) {
      const url = this.urlForUpdateRecord(snapshot.id, type.modelName, snapshot) + '/comment';
      return this.ajax(url, 'PUT', { data: { 'jury-comment': snapshot.adapterOptions.comment } });
    } else if (snapshot.adapterOptions.isDeleteComment) {
      const url = this.urlForUpdateRecord(snapshot.id, type.modelName, snapshot) + '/comment';
      return this.ajax(url, 'DELETE');
    }

    return super.updateRecord(...arguments);
  }
}
