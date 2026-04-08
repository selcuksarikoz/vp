'use client';

import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import { i18n } from './client';

type LanguageProviderProps = Readonly<{
  children: ReactNode;
}>;

export function LanguageProvider({ children }: LanguageProviderProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
