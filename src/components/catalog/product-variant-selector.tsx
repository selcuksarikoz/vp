'use client';

import { ShoppingBasket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { ProductVariant } from '@/types/commerce';

import { Badge } from '@/components/ui/badge';
import { clsx } from 'clsx';

type ProductVariantSelectorProps = Readonly<{
  cartQuantities?: Record<string, number>;
  onSelect: (variantId: string) => void;
  selectedVariantId: string | null;
  variants: ProductVariant[];
}>;

function getVariantLabel(variant: ProductVariant, index: number) {
  return variant.name ?? variant.id ?? `Variant ${index + 1}`;
}

export function ProductVariantSelector({
  cartQuantities = {},
  onSelect,
  selectedVariantId,
  variants,
}: ProductVariantSelectorProps) {
  const { t } = useTranslation();

  if (!variants.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <p className="text-sm font-semibold text-zinc-950">{t('product.variantsTitle')}</p>
      {/* Variants Grid */}
      <div className="grid gap-3 sm:grid-cols-3">
        {variants.map((variant, index) => {
          const variantId = variant.id ?? '';
          const isActive = selectedVariantId === variantId;
          const cartQuantity = cartQuantities[variantId] ?? 0;

          return (
            <button
              className={clsx(
                'relative rounded-lg border p-4 text-left transition-colors',
                isActive
                  ? 'border-zinc-950 bg-zinc-950 text-white'
                  : 'border-black/10 bg-white text-zinc-950 hover:border-zinc-950',
              )}
              key={variant.id ?? variant.name ?? `variant-${index}`}
              onClick={() => onSelect(variantId)}
              type="button"
            >
              {cartQuantity > 0 ? (
                <Badge
                  className="absolute right-3 top-3 gap-1"
                  variant={isActive ? 'outline' : 'dark'}
                >
                  <ShoppingBasket className="h-3 w-3" />
                  <span>{cartQuantity}</span>
                </Badge>
              ) : null}
              <p className="text-sm font-semibold tracking-tight">
                {getVariantLabel(variant, index)}
              </p>
              <div
                className={clsx(
                  'mt-3 space-y-1.5 text-sm',
                  isActive ? 'text-white/72' : 'text-zinc-500',
                )}
              >
                {variant.capacity ? <p>{variant.capacity}</p> : null}
                {variant.dimensions?.width ? <p>W {variant.dimensions.width}</p> : null}
                {variant.dimensions?.height ? <p>H {variant.dimensions.height}</p> : null}
                {variant.dimensions?.depth ? <p>D {variant.dimensions.depth}</p> : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
