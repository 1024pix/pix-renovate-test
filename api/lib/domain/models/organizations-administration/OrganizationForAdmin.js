import { DataProtectionOfficer } from '../DataProtectionOfficer.js';
import * as apps from '../../constants.js';

class OrganizationForAdmin {
  constructor({
    id,
    name,
    type,
    logoUrl,
    externalId,
    provinceCode,
    isManagingStudents,
    credit,
    email,
    documentationUrl,
    createdBy,
    createdAt,
    showNPS,
    formNPSUrl,
    showSkills,
    archivedAt,
    archivistFirstName,
    archivistLastName,
    dataProtectionOfficerFirstName,
    dataProtectionOfficerLastName,
    dataProtectionOfficerEmail,
    creatorFirstName,
    creatorLastName,
    identityProviderForCampaigns,
    enableMultipleSendingAssessment,
    tags = [],
    features = {},
  } = {}) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.logoUrl = logoUrl;
    this.externalId = externalId;
    this.provinceCode = provinceCode;
    this.isManagingStudents = isManagingStudents;
    this.credit = credit;
    this.email = email;
    this.documentationUrl = documentationUrl;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.showNPS = showNPS;
    this.formNPSUrl = formNPSUrl;
    this.showSkills = showSkills;
    this.archivedAt = archivedAt;
    this.archivistFirstName = archivistFirstName;
    this.archivistLastName = archivistLastName;
    this.dataProtectionOfficer = new DataProtectionOfficer({
      organizationId: id,
      firstName: dataProtectionOfficerFirstName,
      lastName: dataProtectionOfficerLastName,
      email: dataProtectionOfficerEmail,
    });
    this.creatorFirstName = creatorFirstName;
    this.creatorLastName = creatorLastName;
    this.identityProviderForCampaigns = identityProviderForCampaigns;
    this.enableMultipleSendingAssessment = enableMultipleSendingAssessment;
    this.tags = tags;
    this.features = features;
  }

  get archivistFullName() {
    return this.archivistFirstName && this.archivistLastName
      ? `${this.archivistFirstName} ${this.archivistLastName}`
      : null;
  }

  get creatorFullName() {
    return this.creatorFirstName && this.creatorLastName ? `${this.creatorFirstName} ${this.creatorLastName}` : null;
  }

  updateInformation(organization, dataProtectionOfficer) {
    if (organization.name) this.name = organization.name;
    if (organization.type) this.type = organization.type;
    if (organization.logoUrl) this.logoUrl = organization.logoUrl;
    this.email = organization.email;
    this.credit = organization.credit;
    this.externalId = organization.externalId;
    this.provinceCode = organization.provinceCode;
    this.isManagingStudents = organization.isManagingStudents;
    this.documentationUrl = organization.documentationUrl;
    this.showSkills = organization.showSkills;
    this.identityProviderForCampaigns = organization.identityProviderForCampaigns;
    this.features[apps.ORGANIZATION_FEATURE.MULTIPLE_SENDING_ASSESSMENT.key] =
      organization.enableMultipleSendingAssessment;
    this.dataProtectionOfficer.firstName = dataProtectionOfficer.firstName;
    this.dataProtectionOfficer.lastName = dataProtectionOfficer.lastName;
    this.dataProtectionOfficer.email = dataProtectionOfficer.email;
  }
}

export { OrganizationForAdmin };
