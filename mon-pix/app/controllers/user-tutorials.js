import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class UserTutorialsController extends Controller {
  @service intl;

  pageTitle = this.intl.t('navigation.user.tutorials');
}
