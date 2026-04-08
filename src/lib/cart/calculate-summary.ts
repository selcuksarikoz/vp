import { CART_CONSTANTS } from '@/constants/cart';
import type { CartLine } from '@/types/commerce';

export type CalculatedCartSummary = {
  currency: string;
  itemCount: number;
  pricedItemCount: number;
  requestedItemCount: number;
  subtotal: number | null;
  taxAmount: number | null;
  taxRate: number;
  total: number | null;
};

/**
 * @description Calculates totals and item counts from resolved cart lines.
 * @param lines The resolved cart lines.
 * @param currency The summary currency code.
 * @returns The calculated cart summary.
 */
export function calculateCartSummary(
  lines: CartLine[],
  currency: string = CART_CONSTANTS.currency,
): CalculatedCartSummary {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const pricedLines = lines.filter((line) => typeof line.lineTotal === 'number');
  const pricedItemCount = pricedLines.reduce((sum, line) => sum + line.quantity, 0);
  const requestedItemCount = itemCount - pricedItemCount;

  if (!pricedLines.length) {
    return {
      currency,
      itemCount,
      pricedItemCount,
      requestedItemCount,
      subtotal: null,
      taxAmount: null,
      taxRate: CART_CONSTANTS.taxRate,
      total: null,
    };
  }

  const total = pricedLines.reduce((sum, line) => sum + (line.lineTotal ?? 0), 0);
  const subtotal = total / (1 + CART_CONSTANTS.taxRate);
  const taxAmount = total - subtotal;

  return {
    currency,
    itemCount,
    pricedItemCount,
    requestedItemCount,
    subtotal,
    taxAmount,
    taxRate: CART_CONSTANTS.taxRate,
    total,
  };
}
