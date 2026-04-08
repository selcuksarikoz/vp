import { ratingCollectionSchema } from '@/lib/schemas/commerce';
import type { ProductRating } from '@/types/commerce';
import { mergeCachedVotesIntoRating } from '@/lib/rating/cache';

import { buildResourcePath, readParsed } from './shared';

/**
 * @description Fetches all raw rating entries for a product.
 * @param productId The product id.
 * @returns The raw rating entries.
 */
export async function getProductRatingEntries(
  productId: string | null | undefined,
): Promise<ProductRating[]> {
  if (!productId) {
    return [];
  }

  return readParsed(buildResourcePath('/ratings', { productId }), {
    fallback: [],
    schema: ratingCollectionSchema,
    tags: ['ratings', `rating:${productId}`],
  });
}

/**
 * @description Aggregates raw rating entries into a single rating summary.
 * @param productId The product id.
 * @param ratings The raw rating entries.
 * @returns The aggregated product rating or `null`.
 */
function resolveProductRatingSummary(productId: string, ratings: ProductRating[]) {
  const baseRating = ratings.find(
    (entry) => typeof entry.average === 'number' && typeof entry.count === 'number',
  );
  const votes = ratings.filter(
    (entry): entry is ProductRating & { value: number } => typeof entry.value === 'number',
  );
  const baseCount = baseRating?.count ?? 0;
  const baseSum = (baseRating?.average ?? 0) * baseCount;
  const voteSum = votes.reduce((sum, entry) => sum + entry.value, 0);
  const count = baseCount + votes.length;

  if (!count) {
    return null;
  }

  return {
    average: Number(((baseSum + voteSum) / count).toFixed(1)),
    count,
    id: baseRating?.id ?? `rating_${productId}`,
    productId,
  } satisfies ProductRating;
}

/**
 * @description Fetches the effective product rating including cached optimistic votes.
 * @param productId The product id.
 * @returns The effective product rating or `null`.
 */
export async function getProductRating(
  productId: string | null | undefined,
): Promise<ProductRating | null> {
  if (!productId) {
    return null;
  }

  const ratings = await getProductRatingEntries(productId);
  const resolvedRating = resolveProductRatingSummary(productId, ratings);

  return mergeCachedVotesIntoRating(productId, resolvedRating);
}

/**
 * @description Fetches the rating summary together with the local voting state.
 * @param productId The product id.
 * @returns The rating state object used by the UI.
 */
export async function getProductRatingState(
  productId: string | null | undefined,
): Promise<{ hasRated: boolean; rating: ProductRating | null }> {
  if (!productId) {
    return { hasRated: false, rating: null };
  }

  const ratings = await getProductRatingEntries(productId);
  const resolvedRating = resolveProductRatingSummary(productId, ratings);

  return {
    hasRated: false,
    rating: mergeCachedVotesIntoRating(productId, resolvedRating),
  };
}
