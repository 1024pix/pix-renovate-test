import path from 'node:path';

import { I18n } from 'i18n';

import { SUPPORTED_LOCALES } from '../../domain/constants.js';
import { logger } from '../utils/logger.js';

const __dirname = import.meta.dirname;
const translationsFolder = path.resolve(path.join(__dirname, '../../../../translations'));

const supportedLocales = SUPPORTED_LOCALES.map((supportedLocale) => supportedLocale.toLowerCase());

const DEFAULT_LOCALE = 'fr';

export const options = {
  locales: ['en', 'fr', 'es', 'nl'],
  fallbacks: { 'en-*': 'en', 'fr-*': 'fr', 'es-*': 'es', 'nl-*': 'nl' },
  defaultLocale: DEFAULT_LOCALE,
  directory: translationsFolder,
  queryParameter: 'lang',
  languageHeaderField: 'Accept-Language',
  objectNotation: true,
  updateFiles: false,
  mustacheConfig: {
    tags: ['{', '}'],
    disable: false,
  },
};

// This is an optimization to avoid settings a new instance each time
// we need to use i18n.
const i18nInstances = {};

/**
 * @param {string} locale a locale (language or BCP 47 format)
 * @returns i18n instance correctly setup with the language
 */
export function getI18n(locale) {
  if (!locale || !supportedLocales.includes(locale?.toLowerCase())) {
    return getI18n(DEFAULT_LOCALE);
  }

  if (!i18nInstances[locale]) {
    const i18n = new I18n(options);
    i18n.setLocale(locale);
    // we freeze the setLocale to avoid changing i18n locale for an instance
    i18n.setLocale = () => {
      logger.warn('Cannot change i18n locale instance, use getI18n(locale) instead.');
    };
    i18nInstances[locale] = i18n;
  }

  return i18nInstances[locale];
}
