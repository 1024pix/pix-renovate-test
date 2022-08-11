import { memberAction } from 'ember-api-actions';
import Model, { hasMany, attr } from '@ember-data/model';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { equal } from '@ember/object/computed';
import dayjs from 'dayjs';

export default class Organization extends Model {
  @attr('nullable-string') name;
  @attr('nullable-string') type;
  @attr('nullable-string') logoUrl;
  @attr('nullable-string') externalId;
  @attr('nullable-string') provinceCode;
  @attr('boolean') isManagingStudents;
  @attr('boolean') showNPS;
  @attr('string') formNPSUrl;
  @attr('number') credit;
  @attr('nullable-string') email;
  @attr('date') createdBy;
  @attr('nullable-string') documentationUrl;
  @attr('boolean') showSkills;
  @attr('nullable-string') archivistFullName;
  @attr('date') archivedAt;
  @attr('nullable-string') creatorFullName;

  @equal('type', 'SCO') isOrganizationSCO;
  @equal('type', 'SUP') isOrganizationSUP;

  @hasMany('membership') memberships;
  @hasMany('targetProfile') targetProfiles;
  @hasMany('tag') tags;

  async hasMember(userId) {
    const memberships = await this.memberships;
    return !!memberships.findBy('user.id', userId);
  }

  get archivedFormattedDate() {
    return dayjs(this.archivedAt).format('DD/MM/YYYY');
  }

  get isArchived() {
    return !!this.archivistFullName;
  }

  attachTargetProfiles = memberAction({
    path: 'target-profiles',
    type: 'post',
    before(attributes) {
      const payload = this.serialize();
      payload.data.attributes = Object.assign(payload.data.attributes, attributes);
      return payload;
    },
    after(response) {
      this.targetProfiles.reload();
      return response;
    },
  });
}
