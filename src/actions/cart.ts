'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { Cart } from '@/types/commerce';
import type { AddToCartActionState } from '@/actions/cart.types';
import { parseAddToCartFormData, parseUpdateCartLineFormData } from '@/lib/schemas/cart-actions';

import { mutateJson } from '@/lib/api/client';
import { getCart } from '@/lib/api/commerce';
import { buildNextCart, buildUpdatedCartLineCart } from '@/lib/cart/mutations';

/**
 * @description Persists the next cart snapshot to the mocked API and revalidates affected pages.
 * @param nextCart The next cart state to store.
 * @param currentPath The current route path that should also be revalidated.
 * @returns A promise that resolves when persistence and revalidation finish.
 */
async function persistCart(nextCart: Cart, currentPath?: string) {
  await mutateJson('/cart', { fallback: nextCart, method: 'PUT' }, nextCart);
  revalidateTag('cart', 'max');
  revalidatePath('/cart');

  if (currentPath) {
    revalidatePath(currentPath);
  }
}

/**
 * @description Adds a product or variant to the cart and returns form state for the UI.
 * @param _previousState The previous form action state.
 * @param formData The submitted form payload.
 * @returns The next add-to-cart form state.
 */
export async function addToCartAction(
  _previousState: AddToCartActionState,
  formData: FormData,
): Promise<AddToCartActionState> {
  const parsed = parseAddToCartFormData(formData);

  if (!parsed.success) {
    return {
      message: 'Unable to add this product right now.',
      status: 'error',
    };
  }

  const cart = await getCart();
  await persistCart(buildNextCart(cart, parsed.data), parsed.data.currentPath);

  return {
    message: 'Added to cart.',
    status: 'success',
  };
}

/**
 * @description Adds the product to the cart and redirects the user to the cart page.
 * @param formData The submitted form payload.
 * @returns A redirect to the cart page.
 */
export async function buyNowAction(formData: FormData) {
  const parsed = parseAddToCartFormData(formData);

  if (!parsed.success) {
    redirect('/cart');
  }

  const cart = await getCart();

  await persistCart(buildNextCart(cart, parsed.data), parsed.data.currentPath);
  redirect('/cart');
}

/**
 * @description Updates an existing cart line quantity and removes it when the quantity becomes zero.
 * @param formData The submitted form payload.
 * @returns A promise that resolves when the cart update is complete.
 */
export async function updateCartLineAction(formData: FormData) {
  const parsed = parseUpdateCartLineFormData(formData);

  if (!parsed.success) {
    return;
  }

  const cart = await getCart();

  await persistCart(buildUpdatedCartLineCart(cart, parsed.data), parsed.data.currentPath);
}
