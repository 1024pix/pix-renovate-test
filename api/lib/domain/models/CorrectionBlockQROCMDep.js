const Joi = require('joi');

class CorrectionBlockQROCMDep {
  /**
   * @type {boolean}
   */
  #validated;

  /**
   * @type {string[]}
   */
  #alternativeSolutions;

  /**
   * @param {boolean} validated
   * @param {string[]} alternativeSolutions
   */
  constructor(validated = false, alternativeSolutions = []) {
    this.#validateValidatedArgument(validated);
    this.#validateAlternativeSolutionsArgument(alternativeSolutions);

    this.#validated = validated;
    this.#alternativeSolutions = alternativeSolutions;
  }

  /**
   * @returns {boolean}
   */
  get validated() {
    return this.#validated;
  }

  /**
   * @returns {string[]}
   */
  get alternativeSolutions() {
    return this.#alternativeSolutions;
  }

  /**
   * @param {string[]} alternativeSolutions
   */
  set alternativeSolutions(alternativeSolutions) {
    this.#validateAlternativeSolutionsArgument(alternativeSolutions);
    this.#alternativeSolutions = alternativeSolutions;
  }

  /**
   * @param {boolean} validated
   */
  #validateValidatedArgument(validated) {
    Joi.attempt(validated, Joi.boolean().required());
  }

  /**
   * @param {string[]} alternativeSolutions
   */
  #validateAlternativeSolutionsArgument(alternativeSolutions) {
    Joi.attempt(alternativeSolutions, Joi.array().required().items(Joi.string()));
  }
}

module.exports = CorrectionBlockQROCMDep;
