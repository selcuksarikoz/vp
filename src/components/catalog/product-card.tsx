import Image from 'next/image';
import Link from 'next/link';

import type { Product, ProductRating } from '@/types/commerce';

import { ProductCardBuyNowForm } from '@/components/catalog/product-card-buy-now-form';
import { Price } from '@/components/ui/price';
import { RatingStars } from '@/components/ui/rating-stars';
import { resolveProductHref, resolveProductName } from '@/lib/commerce/presentation';
import { getServerT } from '@/languages/server';

type ProductCardProps = Readonly<{
  product: Product;
  rating: ProductRating | null;
}>;

export async function ProductCard({ product, rating }: ProductCardProps) {
  const t = await getServerT();
  const image = product.images?.[0];
  const name = resolveProductName(product, t('product.fallbackName'));
  const href = resolveProductHref(product);
  const canBuy = Boolean(product.id);
  const ratingAverage = typeof rating?.average === 'number' ? rating.average : 0;
  const ratingCount = rating?.count ?? 0;

  return (
    <article className="group overflow-hidden rounded-xl border border-black/8 bg-white transition-colors duration-200 hover:border-black/14">
      {/* Product Image Area */}
      <Link
        className="relative block aspect-square"
        href={href}
        style={{ viewTransitionName: `product-image-${product.id}` }}
      >
        {image?.url ? (
          <Image
            alt={image.alt ?? name}
            className="object-contain p-6"
            decoding="async"
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            src={image.url}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {t('product.imageFallbackBadge')}
            </span>
          </div>
        )}
      </Link>

      {/* Product Details Area */}
      <div className="space-y-4 p-5 sm:p-6">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <RatingStars className="gap-0.5" size={14} value={ratingAverage} />
          <span className="font-semibold text-zinc-700">{ratingAverage.toFixed(1)}</span>
          <span>({ratingCount})</span>
        </div>

        {/* Title and Description */}
        <div className="space-y-2">
          {product.brand ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {product.brand}
            </p>
          ) : null}
          <h3 className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
            <Link href={href} style={{ viewTransitionName: `product-title-${product.id}` }}>
              {name}
            </Link>
          </h3>
          {product.description ? (
            <p className="line-clamp-2 text-sm leading-6 text-zinc-600">{product.description}</p>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-4">
          <Price amount={product.price?.gross} currency={product.price?.currency} />
          <ProductCardBuyNowForm
            canBuy={canBuy}
            pendingLabel={t('product.redirectingToCart')}
            productId={product.id}
            submitLabel={t('product.buyNow')}
          />
        </div>
      </div>
    </article>
  );
}
