import { DomainError } from '../../shared/domain/errors.js';

class UnableToAttachChildOrganizationToParentOrganizationError extends DomainError {
  constructor({
    code = 'UNABLE_TO_ATTACH_CHILD_ORGANIZATION_TO_PARENT_ORGANIZATION',
    message = 'Unable to attach child organization to parent organization',
    meta,
  } = {}) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

class DpoEmailInvalid extends DomainError {
  constructor({ code = 'DPO_EMAIL_INVALID', message = 'DPO email invalid', meta } = {}) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

class OrganizationNotFound extends DomainError {
  constructor({ code = 'ORGANIZATION_NOT_FOUND', message = 'Organization does not exist', meta } = {}) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

class TagNotFoundError extends DomainError {
  constructor(meta) {
    super('Tag does not exist', 'TAG_NOT_FOUND');
    if (meta) this.meta = meta;
  }
}

class OrganizationBatchUpdateError extends DomainError {
  constructor({ code = 'ORGANIZATION_BATCH_UPDATE_ERROR', message = 'Organization batch update failed', meta } = {}) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

class FeatureNotFound extends DomainError {
  constructor({ code = 'FEATURE_NOT_FOUND', message = 'Feature does not exist', meta } = {}) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

class FeatureParamsNotProcessable extends DomainError {
  constructor({ code = 'FEATURE_PARAMS_NOT_PROCESSABLE', message = 'Feature params are not processable', meta } = {}) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

export {
  DpoEmailInvalid,
  FeatureNotFound,
  FeatureParamsNotProcessable,
  OrganizationBatchUpdateError,
  OrganizationNotFound,
  TagNotFoundError,
  UnableToAttachChildOrganizationToParentOrganizationError,
};
