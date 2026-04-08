import type { Product, ProductVariant } from '@/types/commerce';

/**
 *
 * @param product
 * @returns
 */
/**
 * @description Filters a product's variants down to variants that can actually be selected.
 * @param product The product being purchased.
 * @returns The selectable product variants.
 */
export function getSelectableVariants(product: Product): ProductVariant[] {
  return (product.variants ?? []).filter(
    (variant): variant is ProductVariant => typeof variant.id === 'string' && variant.id.length > 0,
  );
}

/**
 * @description Resolves the currently active variant id from explicit selection or the first selectable variant.
 * @param selectedVariantId The currently selected variant id.
 * @param selectableVariants The selectable variants.
 * @returns The active variant id or `null`.
 */
export function resolveActiveVariantId(
  selectedVariantId: string | null,
  selectableVariants: ProductVariant[],
) {
  return selectedVariantId ?? selectableVariants[0]?.id ?? null;
}

/**
 * @description Returns the next quantity map after updating one keyed quantity entry.
 * @param current The current quantity map.
 * @param key The map key to update.
 * @param quantity The next quantity value.
 * @returns The updated quantity map.
 */
export function getNextQuantityMap(current: Record<string, number>, key: string, quantity: number) {
  return {
    ...current,
    [key]: quantity,
  };
}

/**
 * @description Returns the next cart quantity map after incrementing one variant entry.
 * @param current The current cart quantity map.
 * @param variantId The variant id to increment.
 * @param quantity The quantity delta to add.
 * @returns The updated cart quantity map.
 */
export function getNextCartQuantities(
  current: Record<string, number>,
  variantId: string,
  quantity: number,
) {
  return {
    ...current,
    [variantId]: (current[variantId] ?? 0) + quantity,
  };
}
