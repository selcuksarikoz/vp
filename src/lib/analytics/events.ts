import type { Product } from '@/types/commerce';

import type { AddToCartEvent, AnalyticsItem, ViewItemEvent } from './types';

/**
 * @description Resolves a readable variant name from the selected variant id.
 * @param product The product containing variants.
 * @param variantId The selected variant id.
 * @returns The resolved variant name or `null`.
 */
function resolveVariantName(product: Product, variantId?: string | null) {
  if (!variantId) {
    return null;
  }

  const variant = (product.variants ?? []).find((entry) => entry.id === variantId);

  return variant?.name ?? variant?.id ?? variantId;
}

/**
 * @description Maps a product into the analytics item payload used by tracking events.
 * @param product The product to map.
 * @param options Optional quantity and variant information.
 * @returns The analytics item payload.
 */
export function createAnalyticsItem(
  product: Product,
  options?: {
    quantity?: number;
    variantId?: string | null;
  },
): AnalyticsItem {
  const quantity = options?.quantity ?? 1;
  const variantName = resolveVariantName(product, options?.variantId);

  return {
    item_id: product.id ?? null,
    item_name: product.name ?? product.sku ?? product.slug ?? product.id ?? null,
    item_brand: product.brand ?? null,
    item_category: product.categoryIds?.[0] ?? null,
    item_variant: variantName,
    price: product.price?.gross ?? null,
    quantity,
    currency: product.price?.currency ?? null,
  };
}

/**
 * @description Creates a `view_item` event for product detail page tracking.
 * @param product The viewed product.
 * @returns The analytics event payload.
 */
export function createViewItemEvent(product: Product): ViewItemEvent {
  const item = createAnalyticsItem(product);

  return {
    event: 'view_item',
    page_type: 'product',
    ecommerce: {
      currency: item.currency,
      items: [item],
    },
  };
}

/**
 * @description Creates an `add_to_cart` event for cart submission tracking.
 * @param product The added product.
 * @param options Optional quantity and variant information.
 * @returns The analytics event payload.
 */
export function createAddToCartEvent(
  product: Product,
  options?: {
    quantity?: number;
    variantId?: string | null;
  },
): AddToCartEvent {
  const item = createAnalyticsItem(product, options);

  return {
    event: 'add_to_cart',
    page_type: 'product',
    ecommerce: {
      currency: item.currency,
      value: typeof item.price === 'number' ? item.price * item.quantity : null,
      items: [item],
    },
  };
}
