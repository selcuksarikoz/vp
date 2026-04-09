'use client';

import { useActionState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

import { initialAddToCartActionState, type AddToCartActionState } from '@/actions/cart.types';
import { addToCartAction } from '@/actions/cart';
import type { Product } from '@/types/commerce';

import { pushToDataLayer } from '@/lib/analytics/data-layer';
import { createAddToCartEvent } from '@/lib/analytics/events';

type TrackedAddToCartFormProps = Readonly<{
  children: (state: AddToCartActionState) => ReactNode;
  onBeforeSubmit?: (payload: { quantity: number; variantId: string | null }) => void;
  product: Product;
}>;

export function TrackedAddToCartForm({
  children,
  onBeforeSubmit,
  product,
}: TrackedAddToCartFormProps) {
  const pathname = usePathname();
  const [state, formAction] = useActionState(addToCartAction, initialAddToCartActionState);
  const previousStateRef = useRef(state);

  useEffect(() => {
    const previousState = previousStateRef.current;
    const hasStateChanged =
      previousState.status !== state.status || previousState.message !== state.message;

    if (!hasStateChanged) {
      return;
    }

    previousStateRef.current = state;

    if (state.status === 'success' && state.message) {
      toast.success(state.message);
    }

    if (state.status === 'error' && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const quantityValue = Number(formData.get('quantity'));
        const variantIdValue = formData.get('variantId');
        const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1;
        const variantId =
          typeof variantIdValue === 'string' && variantIdValue.length ? variantIdValue : null;

        onBeforeSubmit?.({
          quantity,
          variantId,
        });

        pushToDataLayer(
          createAddToCartEvent(product, {
            quantity,
            variantId,
          }),
        );
      }}
    >
      <input name="currentPath" type="hidden" value={pathname} />
      {children(state)}
    </form>
  );
}
