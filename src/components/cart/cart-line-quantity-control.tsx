'use client';

import { usePathname } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

import { updateCartLineAction } from '@/actions/cart';
import { QuantityStepper } from '@/components/ui/quantity-stepper';

type CartLineQuantityControlProps = Readonly<{
  productId: string;
  quantity: number;
  variantId?: string | null;
}>;

export function CartLineQuantityControl({
  productId,
  quantity,
  variantId,
}: CartLineQuantityControlProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
    quantity,
    (_currentValue, nextValue: number) => nextValue,
  );

  function updateQuantity(nextQuantity: number) {
    startTransition(async () => {
      setOptimisticQuantity(nextQuantity);

      const formData = new FormData();

      formData.set('currentPath', pathname);
      formData.set('productId', productId);
      formData.set('quantity', String(nextQuantity));

      if (variantId) {
        formData.set('variantId', variantId);
      }

      await updateCartLineAction(formData);
    });
  }

  return (
    <QuantityStepper
      decreaseLabel={t('product.decreaseQuantity')}
      disabled={isPending}
      increaseLabel={t('product.increaseQuantity')}
      min={0}
      onDecrease={() => updateQuantity(Math.max(0, optimisticQuantity - 1))}
      onIncrease={() => updateQuantity(Math.min(99, optimisticQuantity + 1))}
      value={optimisticQuantity}
    />
  );
}
