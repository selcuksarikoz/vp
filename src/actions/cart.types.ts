export type AddToCartActionState = {
  message: string | null;
  status: 'error' | 'idle' | 'success';
};

export const initialAddToCartActionState: AddToCartActionState = {
  message: null,
  status: 'idle',
};
