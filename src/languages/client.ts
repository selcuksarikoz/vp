'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getI18nOptions } from './shared';

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init(getI18nOptions());
}

export { i18n };
