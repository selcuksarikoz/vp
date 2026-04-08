'use client';

import { useFormStatus } from 'react-dom';

import { buyNowAction } from '@/actions/cart';
import { Button } from '@/components/ui/button';

function BuyNowSubmitButton({
  disabled,
  label,
  pendingLabel,
}: Readonly<{
  disabled: boolean;
  label: string;
  pendingLabel: string;
}>) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={disabled || pending} size="sm" type="submit" variant="outline">
      {pending ? pendingLabel : label}
    </Button>
  );
}

type ProductCardBuyNowFormProps = Readonly<{
  canBuy: boolean;
  pendingLabel: string;
  productId: string | null | undefined;
  submitLabel: string;
}>;

export function ProductCardBuyNowForm({
  canBuy,
  pendingLabel,
  productId,
  submitLabel,
}: ProductCardBuyNowFormProps) {
  return (
    <form action={buyNowAction}>
      <input name="productId" type="hidden" value={productId ?? ''} />
      <input name="quantity" type="hidden" value="1" />
      <BuyNowSubmitButton disabled={!canBuy} label={submitLabel} pendingLabel={pendingLabel} />
    </form>
  );
}
