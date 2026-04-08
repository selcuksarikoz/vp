import { cache } from 'react';
import { createInstance } from 'i18next';

import { DEFAULT_NAMESPACE } from '@/constants/i18n';

import { getI18nOptions } from './shared';

export const getServerT = cache(async () => {
  const instance = createInstance();

  await instance.init(getI18nOptions());

  return instance.getFixedT(null, DEFAULT_NAMESPACE);
});
