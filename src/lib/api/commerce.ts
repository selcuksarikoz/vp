import { CART_CONSTANTS } from '@/constants/cart';
import { calculateCartSummary } from '@/lib/cart/calculate-summary';
import type { CartLine, Product } from '@/types/commerce';

import { getCart } from './cart';
import { getCategoryBySlug, getCategories } from './categories';
import {
  getCatalogProducts,
  getProductBySlug,
  getProducts,
  getProductsByCategorySlug,
  getProductsByIds,
} from './products';
import { getProductRating, getProductRatingEntries, getProductRatingState } from './ratings';

/**
 * @description Aggregates all API functions into a single module for convenient importing.
 * This module provides high-level data access for products, categories, cart, and ratings.
 */

/**
 * @description Resolves a product variant from a product and variant id.
 * @param product The product containing variants.
 * @param variantId The selected variant id.
 * @returns The matching variant or `null`.
 */
function resolveVariant(product: Product | null, variantId: string | null | undefined) {
  if (!product || !variantId) {
    return null;
  }

  return (product.variants ?? []).find((variant) => variant.id === variantId) ?? null;
}

/**
 * @description Joins raw cart items with full product data and pricing information.
 * @param cart The raw cart resource.
 * @param products The resolved product collection.
 * @returns The enriched cart lines.
 */
function resolveCartLines(
  cart: Awaited<ReturnType<typeof getCart>>,
  products: Product[],
): CartLine[] {
  return (cart.items ?? []).map((item) => {
    const product = products.find((entry) => entry.id === item.productId) ?? null;
    const variant = resolveVariant(product, item.variantId);
    const amount = product?.price?.gross ?? null;
    const quantity = item.quantity ?? 1;

    return {
      id: `${item.productId}:${item.variantId ?? 'base'}`,
      product,
      quantity,
      variant,
      unitPrice: product?.price ?? null,
      lineTotal: typeof amount === 'number' ? amount * quantity : null,
    };
  });
}

/**
 * @description Resolves the current cart into enriched lines and a calculated summary.
 * @returns The raw cart, resolved lines, summary, and total.
 */
export async function getResolvedCart(): Promise<{
  cart: Awaited<ReturnType<typeof getCart>>;
  lines: CartLine[];
  summary: ReturnType<typeof calculateCartSummary>;
  total: number | null;
}> {
  const cart = await getCart();
  const productIds = Array.from(
    new Set(
      (cart.items ?? [])
        .map((item) => item.productId ?? null)
        .filter((productId): productId is string => !!productId),
    ),
  );
  const products = await getProductsByIds(productIds);
  const lines = resolveCartLines(cart, products);
  const summary = calculateCartSummary(lines, cart.currency ?? CART_CONSTANTS.currency);

  return {
    cart,
    lines,
    summary,
    total: summary.total,
  };
}

export {
  getCart,
  getCategories,
  getCategoryBySlug,
  getCatalogProducts,
  getProductBySlug,
  getProductRating,
  getProductRatingEntries,
  getProductRatingState,
  getProducts,
  getProductsByCategorySlug,
};
