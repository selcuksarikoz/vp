'use server';

/**
 * This can live in Redis or a DB.
 * Here we simulate it with a small server cache.
 */

import { revalidatePath, updateTag } from 'next/cache';

import type { ProductRating } from '@/types/commerce';

import { getProductRatingEntries } from '@/lib/api/commerce';
import { calculateNextRating } from '@/lib/rating/calculate-next-rating';
import { appendCachedRatingVote } from '@/lib/rating/cache';
import { parseRateProductFormData } from '@/lib/schemas/rating-actions';

/**
 * @description Builds the next aggregated product rating after a new vote.
 * @param currentRating The current aggregated rating.
 * @param productId The id of the rated product.
 * @param value The new rating value.
 * @returns The next aggregated product rating.
 */
function buildNextRating(
  currentRating: ProductRating | null,
  productId: string,
  value: number,
): ProductRating {
  const nextRating = calculateNextRating(currentRating, value);

  return {
    id: currentRating?.id ?? `rating_${productId}`,
    productId,
    average: nextRating.average ?? value,
    count: nextRating.count,
  };
}

/**
 * @description Parses and applies a product rating submission, then revalidates the product page.
 * @param formData The submitted rating form payload.
 * @returns The next aggregated product rating or `null` when the payload is invalid.
 */
export async function rateProductAction(formData: FormData) {
  const parsed = parseRateProductFormData(formData);

  if (!parsed.success) {
    return null;
  }

  const currentRatings = await getProductRatingEntries(parsed.data.productId);
  const currentRating =
    currentRatings.find(
      (entry) => typeof entry.average === 'number' && typeof entry.count === 'number',
    ) ?? null;
  const nextRating = buildNextRating(currentRating, parsed.data.productId, parsed.data.value);

  appendCachedRatingVote(parsed.data.productId, parsed.data.value);

  updateTag('ratings');
  updateTag(`rating:${parsed.data.productId}`);
  revalidatePath(`/products/${parsed.data.productSlug}`);

  return nextRating;
}
