import type { ProductRating } from '@/types/commerce';

export type RatingSnapshot = {
  average: number | null;
  count: number;
};

/**
 * @description Converts a nullable product rating into a normalized snapshot shape.
 * @param rating The product rating.
 * @returns The normalized rating snapshot.
 */
export function toRatingSnapshot(rating: ProductRating | null): RatingSnapshot {
  return {
    average: typeof rating?.average === 'number' ? rating.average : null,
    count: rating?.count ?? 0,
  };
}

/**
 * @description Calculates the next optimistic rating snapshot after one new vote.
 * @param rating The current rating snapshot or product rating.
 * @param value The new vote value.
 * @returns The next rating snapshot.
 */
export function calculateNextRating(
  rating: RatingSnapshot | ProductRating | null,
  value: number,
): RatingSnapshot {
  const currentRating = toRatingSnapshot(rating as ProductRating | null);
  const currentAverage = typeof currentRating.average === 'number' ? currentRating.average : 0;
  const nextCount = currentRating.count + 1;

  return {
    average: Number(((currentAverage * currentRating.count + value) / nextCount).toFixed(1)),
    count: nextCount,
  };
}
