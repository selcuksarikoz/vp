import { Container } from '@/components/ui/container';
import { CartLineItems } from '@/components/cart/cart-line-items';
import { CartSummary } from '@/components/cart/cart-summary';
import { getResolvedCart } from '@/lib/api/commerce';
import { getServerT } from '@/languages/server';

export default async function CartPage() {
  const t = await getServerT();
  const { lines, summary } = await getResolvedCart();
  const isEmpty = !lines.length;

  return (
    <>
      <Container className="section-padding pb-6 lg:pb-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {t('cart.heroEyebrow')}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {t('cart.heroTitle')}
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
            {t('cart.heroDescription')}
          </p>
        </div>
      </Container>

      <Container className="section-padding grid gap-8 pt-0 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartLineItems lines={lines} />
        </div>
        {isEmpty ? null : <CartSummary summary={summary} />}
      </Container>
    </>
  );
}
