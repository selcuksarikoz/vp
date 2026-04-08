import type { InitOptions } from 'i18next';

import { DEFAULT_LANGUAGE, DEFAULT_NAMESPACE } from '../constants/i18n';
import { resources } from './resources';

export function getI18nOptions(language = DEFAULT_LANGUAGE): InitOptions {
  return {
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: DEFAULT_NAMESPACE,
    ns: [DEFAULT_NAMESPACE],
    resources,
    interpolation: {
      escapeValue: false,
    },
  };
}
