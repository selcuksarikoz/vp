import type { Cart } from '@/types/commerce';

/**
 * @description Computes the quantity of each variant currently in the cart for a specific product.
 * @param cartItems The cart line items.
 * @param productId The product id to filter by.
 * @returns A map of variant ids to their total quantities in the cart.
 */
export function computeVariantQuantities(
  cartItems: Cart['items'],
  productId: string,
): Record<string, number> {
  return (cartItems ?? []).reduce(
    (acc, item) => {
      if (item.productId !== productId) {
        return acc;
      }

      const key = item.variantId || 'base';
      acc[key] = (acc[key] || 0) + (item.quantity ?? 0);

      return acc;
    },
    {} as Record<string, number>,
  );
}
