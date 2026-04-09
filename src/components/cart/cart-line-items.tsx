import type { CartLine } from '@/types/commerce';

import { Button } from '@/components/ui/button';
import { Price } from '@/components/ui/price';
import { cn } from '@/lib/utils/cn';
import { getServerT } from '@/languages/server';

import { CartLineProduct } from './cart-line-product';
import { CartLineQuantityControl } from './cart-line-quantity-control';
import { CartLineRemoveButton } from './cart-line-remove-button';

type CartLineItemsProps = Readonly<{
  lines: CartLine[];
}>;

export async function CartLineItems({ lines }: CartLineItemsProps) {
  const t = await getServerT();

  if (!lines.length) {
    return (
      <section className="rounded-xl border border-black/10 bg-white p-8">
        {/* Empty State Content */}
        <p className="eyebrow">{t('cart.emptyEyebrow')}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
          {t('cart.emptyTitle')}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
          {t('cart.emptyDescription')}
        </p>
        <Button className="mt-6" href="/products" size="lg" variant="primary">
          {t('cart.browseCta')}
        </Button>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white shadow-sm">
      {/* Cart Items List */}
      {lines.map((line, index) => (
        <article
          className={cn(
            'group relative border-b border-black/8 p-5 last:border-b-0 sm:p-6',
            index === 0 ? 'rounded-t-xl' : '',
            index === lines.length - 1 ? 'rounded-b-xl' : '',
          )}
          key={line.id}
        >
          {line.product?.id ? (
            <div className="absolute right-0 top-0 z-10 -mt-4 -mr-4 opacity-100 transition-opacity duration-200 sm:-mt-5 sm:-mr-5 sm:opacity-0 sm:group-hover:opacity-100">
              <CartLineRemoveButton productId={line.product.id} variantId={line.variant?.id} />
            </div>
          ) : null}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            {/* Product Info */}
            <CartLineProduct line={line} />

            {/* Quantity and Price */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-4 sm:min-w-[180px]">
              <div className="flex items-center gap-2">
                {line.product?.id ? (
                  <CartLineQuantityControl
                    productId={line.product.id}
                    quantity={line.quantity}
                    variantId={line.variant?.id}
                  />
                ) : null}
              </div>

              <div className="text-left sm:text-right">
                <Price
                  amount={line.lineTotal}
                  className="items-start text-left sm:items-end sm:text-right"
                  currency={line.unitPrice?.currency}
                />
                {line.lineTotal === null ? (
                  <p className="mt-1 text-xs text-zinc-500">{t('cart.quotePendingLine')}</p>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
