import Image from 'next/image';
import Link from 'next/link';

import type { CartLine } from '@/types/commerce';

import { resolveProductHref, resolveProductName } from '@/lib/commerce/presentation';
import { getServerT } from '@/languages/server';

type CartLineProductProps = Readonly<{
  line: CartLine;
}>;

export async function CartLineProduct({ line }: CartLineProductProps) {
  const t = await getServerT();
  const product = line.product;

  if (!product) {
    return (
      <div className="flex min-w-0 gap-4">
        <div className="flex h-22 w-22 shrink-0 items-center justify-center rounded-xl border border-black/8 bg-zinc-50 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:h-24 sm:w-24">
          No image
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-lg font-semibold text-zinc-950">{t('cart.unknownProduct')}</p>
          {line.variant ? (
            <p className="text-sm text-zinc-600">
              {t('cart.variantLabel')}: {line.variant.name}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const href = resolveProductHref(product);
  const name = resolveProductName(product, t('cart.unknownProduct'));
  const image = product.images?.[0];

  return (
    <Link
      className="flex min-w-0 gap-4 transition-opacity hover:opacity-85"
      href={href}
      style={{ viewTransitionName: `product-image-${product.id ?? 'unknown'}` }}
    >
      {/* Product Image Area */}
      <div className="relative h-22 w-22 shrink-0 overflow-hidden rounded-xl border border-black/8 bg-zinc-50 sm:h-24 sm:w-24">
        {image?.url ? (
          <Image
            alt={image.alt ?? name}
            className="object-contain p-3"
            fill
            sizes="96px"
            src={image.url}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            No image
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="min-w-0 space-y-2">
        <p className="text-lg font-semibold text-zinc-950">{name}</p>
        {line.variant ? (
          <p className="text-sm text-zinc-600">
            {t('cart.variantLabel')}: {line.variant.name}
          </p>
        ) : null}
        {product.description ? (
          <p className="line-clamp-2 text-sm leading-6 text-zinc-500">{product.description}</p>
        ) : null}
      </div>
    </Link>
  );
}
