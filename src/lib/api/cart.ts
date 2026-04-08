import { CART_CONSTANTS } from '@/constants/cart';
import { fetchJson } from '@/lib/api/client';
import { cartSchema } from '@/lib/schemas/commerce';
import type { Cart } from '@/types/commerce';

import { parseOrFallback } from './shared';

export const DEFAULT_CART: Cart = {
  id: 'cart',
  items: [],
  currency: CART_CONSTANTS.currency,
  updatedAt: null,
};

export async function getCart(): Promise<Cart> {
  const payload = await fetchJson('/cart', DEFAULT_CART, {
    cache: 'no-store',
  });

  return parseOrFallback(cartSchema, payload, DEFAULT_CART);
}
