import { describe, expect, it } from 'vitest';

import type { CartLine } from '@/types/commerce';

import { calculateCartSummary } from '@/lib/cart/calculate-summary';

describe('calculateCartSummary', () => {
  it('calculates totals for priced lines and tracks requested items separately', () => {
    const lines: CartLine[] = [
      {
        id: 'priced',
        lineTotal: 20,
        product: null,
        quantity: 2,
        unitPrice: null,
        variant: null,
      },
      {
        id: 'quote',
        lineTotal: null,
        product: null,
        quantity: 1,
        unitPrice: null,
        variant: null,
      },
    ];

    const summary = calculateCartSummary(lines, 'EUR');

    expect(summary.currency).toBe('EUR');
    expect(summary.itemCount).toBe(3);
    expect(summary.pricedItemCount).toBe(2);
    expect(summary.requestedItemCount).toBe(1);
    expect(summary.total).toBe(20);
    expect(summary.subtotal).not.toBeNull();
    expect(summary.taxAmount).not.toBeNull();
  });

  it('returns null totals when no priced lines exist', () => {
    const lines: CartLine[] = [
      {
        id: 'quote',
        lineTotal: null,
        product: null,
        quantity: 4,
        unitPrice: null,
        variant: null,
      },
    ];

    const summary = calculateCartSummary(lines, 'EUR');

    expect(summary.itemCount).toBe(4);
    expect(summary.pricedItemCount).toBe(0);
    expect(summary.requestedItemCount).toBe(4);
    expect(summary.subtotal).toBeNull();
    expect(summary.taxAmount).toBeNull();
    expect(summary.total).toBeNull();
  });
});
