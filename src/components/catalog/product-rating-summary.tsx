'use client';

import { useOptimistic, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

import type { ProductRating } from '@/types/commerce';

import { rateProductAction } from '@/actions/rating';
import { RatingStars } from '@/components/ui/rating-stars';
import {
  calculateNextRating,
  toRatingSnapshot,
  type RatingSnapshot,
} from '@/lib/rating/calculate-next-rating';

type ProductRatingSummaryProps = Readonly<{
  hasRated: boolean;
  productId: string | null | undefined;
  productSlug: string | null | undefined;
  rating: ProductRating | null;
}>;

export function ProductRatingSummary({
  hasRated,
  productId,
  productSlug,
  rating,
}: ProductRatingSummaryProps) {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const [optimisticRating, setOptimisticRating] = useOptimistic(
    toRatingSnapshot(rating),
    (currentRating: RatingSnapshot, nextValue: number) =>
      calculateNextRating(currentRating, nextValue),
  );

  function handleRate(value: number) {
    if (!productId || !productSlug || hasRated || isPending) {
      return;
    }

    startTransition(async () => {
      setOptimisticRating(value);

      const formData = new FormData();

      formData.set('productId', productId);
      formData.set('productSlug', productSlug);
      formData.set('value', String(value));

      const result = await rateProductAction(formData);

      if (result && 'error' in result) {
        return;
      }
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <RatingStars
          ariaLabelPrefix={t('product.rateProduct')}
          onSelect={hasRated ? undefined : handleRate}
          value={optimisticRating.average}
        />
        {typeof optimisticRating.average === 'number' ? (
          <>
            <p className="text-sm font-semibold text-zinc-950">
              {optimisticRating.average.toFixed(1)}
            </p>
            <p className="text-sm text-zinc-500">
              {t('product.ratingCount', { count: optimisticRating.count })}
            </p>
          </>
        ) : null}
      </div>
      <p className="text-sm text-zinc-500">
        {hasRated
          ? t('product.ratingLocked')
          : isPending
            ? t('product.ratingSubmitting')
            : t('product.ratingHint')}
      </p>
    </div>
  );
}
