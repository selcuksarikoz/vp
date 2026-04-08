'use client';

import { useEffect, useRef } from 'react';

import type { Product } from '@/types/commerce';

import { pushToDataLayer } from '@/lib/analytics/data-layer';
import { createViewItemEvent } from '@/lib/analytics/events';

type ProductViewTrackerProps = Readonly<{
  product: Product;
}>;

export function ProductViewTracker({ product }: ProductViewTrackerProps) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) {
      return;
    }

    hasTrackedRef.current = true;
    pushToDataLayer(createViewItemEvent(product));
  }, [product]);

  return null;
}
