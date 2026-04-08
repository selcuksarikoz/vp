import { CART_CONSTANTS } from '@/constants/cart';

const fallbackCurrency: string = CART_CONSTANTS.currency;

/**
 * @description Formats a money amount using the locale and currency code.
 * @param amount The numeric amount to format.
 * @param currency The currency code.
 * @param locale The locale used for formatting.
 * @returns The formatted currency string or a fallback dash.
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency: string = fallbackCurrency,
) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return 'Price on request';
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
