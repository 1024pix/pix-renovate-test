import { LEVENSHTEIN_DISTANCE_MAX_RATE } from '../../../../shared/domain/constants.js';
import { DomainError } from '../../../../shared/domain/errors.js';
import { areTwoStringsCloseEnough } from '../../../../shared/domain/services/string-comparison-service.js';
import { validateSupOrganizationLearner } from '../validators/sup-organization-learner-validator.js';
import { SupOrganizationLearner } from './SupOrganizationLearner.js';

const STUDY_SCHEMES = [
  'csv-import-values.sup-organization-learner.study-schemes.initial-training',
  'csv-import-values.sup-organization-learner.study-schemes.training',
  'csv-import-values.sup-organization-learner.study-schemes.continuous-training',
  'csv-import-values.sup-organization-learner.study-schemes.other',
];

const DIPLOMAS = [
  'csv-import-values.sup-organization-learner.diplomas.license',
  'csv-import-values.sup-organization-learner.diplomas.master',
  'csv-import-values.sup-organization-learner.diplomas.doctorat',
  'csv-import-values.sup-organization-learner.diplomas.dnmade',
  'csv-import-values.sup-organization-learner.diplomas.dma ',
  'csv-import-values.sup-organization-learner.diplomas.bts',
  'csv-import-values.sup-organization-learner.diplomas.dut',
  'csv-import-values.sup-organization-learner.diplomas.dts',
  'csv-import-values.sup-organization-learner.diplomas.dcg ',
  'csv-import-values.sup-organization-learner.diplomas.deust',
  'csv-import-values.sup-organization-learner.diplomas.etat-controle',
  'csv-import-values.sup-organization-learner.diplomas.ingenieur',
  'csv-import-values.sup-organization-learner.diplomas.license-grade',
  'csv-import-values.sup-organization-learner.diplomas.master-grade',
  'csv-import-values.sup-organization-learner.diplomas.vise',
  'csv-import-values.sup-organization-learner.diplomas.classe-preparatoire',
  'csv-import-values.sup-organization-learner.diplomas.other',
];

const UNKNOWN = 'csv-import-values.sup-organization-learner.unknown';

class SupOrganizationLearnerSet {
  constructor(i18n) {
    this.i18n = i18n;
    this.learners = [];
    this.warnings = [];
  }

  addLearner(learnerAttributes) {
    this._validateLearnerAttributes(learnerAttributes);

    const learner = new SupOrganizationLearner(learnerAttributes);
    this._checkStudyScheme(learner);
    this._checkDiploma(learner);
    const transformedLearner = this._transform(learner);
    this.learners.push(transformedLearner);
  }

  _validateLearnerAttributes(learnerAttributes) {
    const errors = validateSupOrganizationLearner(learnerAttributes);
    const unicityError = this._checkUniqueStudentNumber(learnerAttributes);
    if (unicityError) {
      errors.push(unicityError);
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

  _addWarning(studentNumber, field, value, code) {
    this.warnings.push({ studentNumber, field, value, code });
  }

  _checkUniqueStudentNumber({ studentNumber }) {
    if (this.learners.map((learner) => learner.studentNumber).includes(studentNumber)) {
      const err = new DomainError();
      err.key = 'studentNumber';
      err.why = 'uniqueness';

      return err;
    }
    return null;
  }

  _checkStudyScheme(learner) {
    const { studentNumber, studyScheme } = learner;
    if (this._isValidI18nValue(STUDY_SCHEMES, studyScheme)) return;
    this._addWarning(studentNumber, 'study-scheme', learner.studyScheme, 'unknown');
    learner.studyScheme = this.i18n.__(UNKNOWN);
  }

  _checkDiploma(learner) {
    const { studentNumber, diploma } = learner;
    if (this._isValidI18nValue(DIPLOMAS, diploma)) return;
    this._addWarning(studentNumber, 'diploma', learner.diploma, 'unknown');
    learner.diploma = this.i18n.__(UNKNOWN);
  }

  _isValidI18nValue(keys, valueToCheck) {
    if (!valueToCheck) return false;
    return keys.some((key) => {
      const reference = this.i18n.__(key).toLowerCase();
      const input = valueToCheck.toLowerCase();
      return areTwoStringsCloseEnough(input, reference, LEVENSHTEIN_DISTANCE_MAX_RATE);
    });
  }
  _transform(learner) {
    return {
      ...learner,
      group: learner.group?.trim().replace(/\s+/g, ' '),
    };
  }
}

export { SupOrganizationLearnerSet };
