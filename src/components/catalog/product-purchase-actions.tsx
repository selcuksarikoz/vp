'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingBag } from 'lucide-react';

import type { Product } from '@/types/commerce';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { ProductVariantSelector } from '@/components/catalog/product-variant-selector';
import { TrackedAddToCartForm } from '@/lib/analytics/components/tracked-add-to-cart-form';
import {
  getNextCartQuantities,
  getNextQuantityMap,
  getSelectableVariants,
  resolveActiveVariantId,
} from '@/lib/commerce/purchase';

type ProductPurchaseActionsProps = Readonly<{
  variantCartQuantities?: Record<string, number>;
  product: Product;
}>;

function AddToCartSubmitButton({
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
    <Button
      className="w-full flex-1"
      disabled={disabled || pending}
      size="lg"
      type="submit"
      variant="primary"
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}

export function ProductPurchaseActions({
  product,
  variantCartQuantities = {},
}: ProductPurchaseActionsProps) {
  const { t } = useTranslation();
  const canAddToCart = Boolean(product.id);
  const selectableVariants = getSelectableVariants(product);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [draftQuantities, setDraftQuantities] = useState<Record<string, number>>({});
  const [cartQuantities, setCartQuantities] =
    useState<Record<string, number>>(variantCartQuantities);
  const activeVariantId = resolveActiveVariantId(selectedVariantId, selectableVariants);
  const activeLineKey = activeVariantId ?? 'base';
  const activeQuantity = draftQuantities[activeLineKey] ?? 1;

  const totalInCart = Object.values(cartQuantities).reduce((sum, q) => sum + q, 0);

  function updateActiveQuantity(nextQuantity: number) {
    setDraftQuantities((current) => getNextQuantityMap(current, activeLineKey, nextQuantity));
  }

  return (
    <TrackedAddToCartForm
      key={product.id ?? product.slug ?? 'product'}
      onBeforeSubmit={({ quantity, variantId }) => {
        const key = variantId || 'base';

        setCartQuantities((current) => getNextCartQuantities(current, key, quantity));
        setDraftQuantities((current) => getNextQuantityMap(current, key, 1));
      }}
      product={product}
    >
      {() => (
        <>
          <input name="productId" type="hidden" value={product.id ?? ''} />
          <input name="quantity" type="hidden" value={activeQuantity} />
          <input name="variantId" type="hidden" value={activeVariantId ?? ''} />

          <div className="space-y-5">
            {/* Variant Selector Area */}
            <ProductVariantSelector
              cartQuantities={cartQuantities}
              onSelect={setSelectedVariantId}
              selectedVariantId={activeVariantId}
              variants={selectableVariants}
            />

            {/* Quantity and Actions Area */}
            <div className="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-3 border-t border-black/10 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:p-6 lg:static lg:flex-row lg:items-center lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="flex w-full items-center gap-3 lg:w-auto lg:flex-1">
                <div className="shrink-0">
                  <QuantityStepper
                    decreaseLabel={t('product.decreaseQuantity')}
                    disabled={!canAddToCart}
                    increaseLabel={t('product.increaseQuantity')}
                    onDecrease={() => updateActiveQuantity(Math.max(1, activeQuantity - 1))}
                    onIncrease={() => updateActiveQuantity(Math.min(99, activeQuantity + 1))}
                    value={activeQuantity}
                  />
                </div>
                <AddToCartSubmitButton
                  disabled={!canAddToCart}
                  label={t('product.addToCart')}
                  pendingLabel={t('product.addingToCart')}
                />
                <Link
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 text-zinc-950 transition-colors hover:border-zinc-950 lg:w-auto lg:px-5"
                  href="/cart"
                  aria-label={t('product.viewCart')}
                >
                  <ShoppingBag className="h-5 w-5 lg:mr-2 lg:h-4 lg:w-4" />
                  <span className="hidden text-sm font-semibold lg:inline">
                    {t('product.viewCart')}
                  </span>
                  {totalInCart > 0 && (
                    <Badge className="absolute -right-1.5 -top-1.5" size="sm" variant="brand">
                      {totalInCart}
                    </Badge>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </TrackedAddToCartForm>
  );
}
