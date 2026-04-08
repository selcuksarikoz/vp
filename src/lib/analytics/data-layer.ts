'use client';

import { ANALYTICS_CONSTANTS } from '@/constants/analytics';
import type { DataLayerEvent } from './types';

type DataLayerWindow = Window & {
  [ANALYTICS_CONSTANTS.dataLayerName]?: DataLayerEvent[];
};

/**
 * @description Ensures that the configured dataLayer array exists on the browser window.
 * @returns The dataLayer array or `null` outside the browser.
 */
export function ensureDataLayer() {
  if (typeof window === 'undefined') {
    return null;
  }

  const scopedWindow = window as DataLayerWindow;
  scopedWindow[ANALYTICS_CONSTANTS.dataLayerName] ??= [];

  return scopedWindow[ANALYTICS_CONSTANTS.dataLayerName];
}

/**
 * @description Pushes an analytics event into the configured dataLayer.
 * @param event The event payload to push.
 * @returns Nothing.
 */
export function pushToDataLayer(event: DataLayerEvent) {
  const dataLayer = ensureDataLayer();

  if (!dataLayer) {
    return;
  }

  dataLayer.push(event);
}
