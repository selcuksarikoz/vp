import type { ProductRating } from '@/types/commerce';

const ratingVotesCache = new Map<string, number[]>();

/**
 * @description Returns optimistic rating votes stored in the in-memory cache.
 * @param productId The product id.
 * @returns The cached vote values.
 */
export function getCachedRatingVotes(productId: string): number[] {
  return ratingVotesCache.get(productId) ?? [];
}

/**
 * @description Appends a new optimistic vote to the in-memory rating cache.
 * @param productId The product id.
 * @param value The new vote value.
 * @returns Nothing.
 */
export function appendCachedRatingVote(productId: string, value: number) {
  const currentVotes = getCachedRatingVotes(productId);

  ratingVotesCache.set(productId, [...currentVotes, value]);
}

/**
 * @description Merges cached optimistic votes into a persisted rating summary.
 * @param productId The product id.
 * @param rating The persisted rating summary.
 * @returns The merged rating summary or the original rating.
 */
export function mergeCachedVotesIntoRating(
  productId: string,
  rating: ProductRating | null,
): ProductRating | null {
  const cachedVotes = getCachedRatingVotes(productId);

  if (!cachedVotes.length && !rating) {
    return null;
  }

  const baseCount = rating?.count ?? 0;
  const baseSum = (rating?.average ?? 0) * baseCount;
  const voteSum = cachedVotes.reduce((sum, value) => sum + value, 0);
  const count = baseCount + cachedVotes.length;

  if (!count) {
    return null;
  }

  return {
    id: rating?.id ?? `rating_${productId}`,
    productId,
    average: Number(((baseSum + voteSum) / count).toFixed(1)),
    count,
  };
}
