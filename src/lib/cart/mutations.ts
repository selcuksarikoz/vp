import type { Cart } from '@/types/commerce';
import type { AddToCartInput, UpdateCartLineInput } from '@/lib/schemas/cart-actions';

/**
 * @description Builds the next cart after adding a product or variant.
 * @param cart The current cart snapshot.
 * @param payload The validated add-to-cart payload.
 * @returns The next cart snapshot.
 */
export function buildNextCart(cart: Cart, payload: AddToCartInput): Cart {
  const currentItems = cart.items ?? [];
  const existingIndex = currentItems.findIndex(
    (item) =>
      item.productId === payload.productId && item.variantId === (payload.variantId ?? null),
  );
  const items = [...currentItems];

  if (existingIndex >= 0) {
    const currentLine = items[existingIndex];

    items[existingIndex] = {
      ...currentLine,
      quantity: (currentLine.quantity ?? 1) + payload.quantity,
    };
  } else {
    items.push({
      productId: payload.productId,
      variantId: payload.variantId ?? null,
      quantity: payload.quantity,
    });
  }

  return {
    ...cart,
    items,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * @description Builds the next cart after setting a cart line quantity.
 * @param cart The current cart snapshot.
 * @param payload The validated cart line update payload.
 * @returns The next cart snapshot.
 */
export function buildUpdatedCartLineCart(cart: Cart, payload: UpdateCartLineInput): Cart {
  const items = (cart.items ?? [])
    .map((item) => {
      if (item.productId !== payload.productId || item.variantId !== (payload.variantId ?? null)) {
        return item;
      }

      return {
        ...item,
        quantity: payload.quantity,
      };
    })
    .filter((item) => (item.quantity ?? 0) > 0);

  return {
    ...cart,
    items,
    updatedAt: new Date().toISOString(),
  };
}
