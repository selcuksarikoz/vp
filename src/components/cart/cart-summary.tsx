import { formatCurrency } from '@/lib/format/currency';
import type { CalculatedCartSummary } from '@/lib/cart/calculate-summary';
import { getServerT } from '@/languages/server';

type CartSummaryProps = Readonly<{
  summary: CalculatedCartSummary;
}>;

export async function CartSummary({ summary }: CartSummaryProps) {
  const t = await getServerT();

  return (
    <aside className="rounded-xl border border-black/10 bg-white p-8 shadow-md lg:sticky lg:top-24 lg:h-fit">
      {/* Summary Header */}
      <p className="eyebrow">{t('cart.summaryEyebrow')}</p>
      {/* Summary Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-zinc-600">
          <span>{t('cart.itemsLabel')}</span>
          <span>{summary.itemCount}</span>
        </div>
        {summary.requestedItemCount ? (
          <div className="flex items-center justify-between text-sm text-zinc-600">
            <span>{t('cart.requestedItemsLabel')}</span>
            <span>{summary.requestedItemCount}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between text-sm text-zinc-600">
          <span>{t('cart.subtotalLabel')}</span>
          <span>
            {summary.subtotal === null
              ? t('cart.quotePendingValue')
              : formatCurrency(summary.subtotal, summary.currency)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-zinc-600">
          <span>{t('cart.taxLabel', { rate: Math.round(summary.taxRate * 100) })}</span>
          <span>
            {summary.taxAmount === null
              ? t('cart.quotePendingValue')
              : formatCurrency(summary.taxAmount, summary.currency)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-black/5 pt-4">
          <span className="text-sm font-medium text-zinc-950">{t('cart.totalLabel')}</span>
          <span className="text-lg font-semibold text-zinc-950">
            {summary.total === null
              ? t('cart.quotePendingValue')
              : formatCurrency(summary.total, summary.currency)}
          </span>
        </div>
        {summary.requestedItemCount ? (
          <p className="text-sm leading-6 text-zinc-500">{t('cart.quotePendingDescription')}</p>
        ) : null}
      </div>
    </aside>
  );
}
