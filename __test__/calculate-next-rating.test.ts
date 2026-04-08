import { describe, expect, it } from 'vitest';

import { calculateNextRating, toRatingSnapshot } from '@/lib/rating/calculate-next-rating';

describe('rating calculation', () => {
  it('creates a first rating from an empty state', () => {
    expect(calculateNextRating(null, 5)).toEqual({
      average: 5,
      count: 1,
    });
  });

  it('aggregates a new vote on top of an existing average', () => {
    expect(
      calculateNextRating(
        {
          average: 4.2,
          count: 5,
        },
        3,
      ),
    ).toEqual({
      average: 4,
      count: 6,
    });
  });

  it('normalizes nullable rating input into a snapshot', () => {
    expect(
      toRatingSnapshot({
        average: undefined,
        count: undefined,
      }),
    ).toEqual({
      average: null,
      count: 0,
    });
  });
});
