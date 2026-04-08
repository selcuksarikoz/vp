import en from './en';

export const resources = {
  en: {
    translation: en,
  },
} as const;

export type AppResources = typeof resources;
export type AppLanguage = keyof AppResources;
