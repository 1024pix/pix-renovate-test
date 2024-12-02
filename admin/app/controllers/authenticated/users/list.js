import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_QUERY_TYPE = 'CONTAINS';

export default class ListController extends Controller {
  queryParams = ['pageNumber', 'pageSize', 'id', 'firstName', 'lastName', 'email', 'username', 'queryType'];

  queryTypes = [
    { value: 'CONTAINS', label: 'Contient' },
    { value: 'EXACT_QUERY', label: 'Exacte' },
  ];

  @tracked pageNumber = DEFAULT_PAGE_NUMBER;
  @tracked queryType = DEFAULT_QUERY_TYPE;
  @tracked pageSize = 10;
  @tracked id = null;
  @tracked firstName = null;
  @tracked lastName = null;
  @tracked email = null;
  @tracked username = null;

  @tracked idForm = null;
  @tracked firstNameForm = null;
  @tracked lastNameForm = null;
  @tracked emailForm = null;
  @tracked usernameForm = null;
  @tracked queryTypeForm = DEFAULT_QUERY_TYPE;

  @action
  async refreshModel(event) {
    event.preventDefault();
    this.id = this.idForm;
    this.firstName = this.firstNameForm;
    this.lastName = this.lastNameForm;
    this.email = this.emailForm;
    this.username = this.usernameForm;
    this.queryType = this.queryTypeForm;
    this.pageNumber = DEFAULT_PAGE_NUMBER;
  }

  @action
  onChangeUserId(event) {
    this.idForm = event.target.value;
  }

  @action
  onChangeFirstName(event) {
    this.firstNameForm = event.target.value;
  }

  @action
  onChangeLastName(event) {
    this.lastNameForm = event.target.value;
  }

  @action
  onChangeEmail(event) {
    this.emailForm = event.target.value;
  }

  @action
  onChangeUsername(event) {
    this.usernameForm = event.target.value;
  }
  @action
  onChangeQueryType(event) {
    this.queryTypeForm = event;
  }

  @action
  clearSearchFields() {
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.username = null;
    this.queryType = DEFAULT_QUERY_TYPE;

    this.idForm = null;
    this.firstNameForm = null;
    this.lastNameForm = null;
    this.emailForm = null;
    this.usernameForm = null;
    this.queryTypeForm = DEFAULT_QUERY_TYPE;
  }
}
