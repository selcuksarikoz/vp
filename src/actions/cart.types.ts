/**
 * @description Represents the UI-facing result of the add-to-cart server action.
 */
export type AddToCartActionState = {
  message: string | null;
  status: 'error' | 'idle' | 'success';
};

/**
 * @description The default add-to-cart action state used before any submission occurs.
 */
export const initialAddToCartActionState: AddToCartActionState = {
  message: null,
  status: 'idle',
};
