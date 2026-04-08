import Link from 'next/link';

import type { Category, Product, ProductRating } from '@/types/commerce';

import { ProductMediaCarousel } from '@/components/catalog/product-media-carousel';
import { ProductPurchaseActions } from '@/components/catalog/product-purchase-actions';
import { ProductRatingSummary } from '@/components/catalog/product-rating-summary';
import { ProductSpecificationsStrip } from '@/components/catalog/product-specifications-strip';
import { Price } from '@/components/ui/price';
import { Badge } from '@/components/ui/badge';
import { resolveProductName } from '@/lib/commerce/presentation';
import { getServerT } from '@/languages/server';

type ProductDetailHeroProps = Readonly<{
  category: Category | null;
  hasRated: boolean;
  product: Product;
  rating: ProductRating | null;
  variantCartQuantities?: Record<string, number>;
}>;

export async function ProductDetailHero({
  category,
  hasRated,
  product,
  rating,
  variantCartQuantities = {},
}: ProductDetailHeroProps) {
  const t = await getServerT();
  const name = resolveProductName(product, t('product.fallbackName'));

  return (
    <section className="grid gap-6 pb-28 lg:pb-0 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:items-start">
      {/* Media Carousel Area */}
      <ProductMediaCarousel
        fallbackLabel={t('product.fallbackImageLabel')}
        images={product.images}
        productName={name}
      />

      {/* Product Information Area */}
      <div className="rounded-xl border border-black/10 bg-white p-6 sm:p-8">
        {/* Brand and Title */}
        {product.brand ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {product.brand}
          </p>
        ) : null}
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          {name}
        </h1>

        {/* Badges Area */}
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge size="lg">
            <span>{t('product.categoryLabel')}:</span>
            {category?.slug ? (
              <Link
                className="ml-1 font-semibold text-zinc-950 hover:text-brand-700"
                href={`/categories/${category.slug}`}
              >
                {category.name ?? t('product.fallbackCategoryLabel')}
              </Link>
            ) : (
              <span className="ml-1 font-semibold text-zinc-950">
                {category?.name ?? t('product.fallbackCategoryLabel')}
              </span>
            )}
          </Badge>

          {product.sku ? (
            <Badge size="lg">
              <span>{t('product.skuPrefix')}:</span>
              <span className="ml-1 font-semibold text-zinc-950">{product.sku}</span>
            </Badge>
          ) : null}

          <Badge size="lg" variant={product.stock?.isInStock ? 'default' : 'outline'}>
            <span className="font-semibold text-zinc-950">
              {product.stock?.isInStock ? t('product.stockIn') : t('product.stockOnRequest')}
            </span>
            {product.stock?.note ? (
              <span className="ml-1 text-zinc-500 hidden sm:inline">- {product.stock.note}</span>
            ) : null}
          </Badge>
        </div>

        <Price
          amount={product.price?.gross}
          className="mt-6"
          currency={product.price?.currency}
          size="hero"
        />

        <div className="mt-5">
          <ProductRatingSummary
            hasRated={hasRated}
            productId={product.id}
            productSlug={product.slug}
            rating={rating}
          />
        </div>

        {product.description ? (
          <p className="mt-6 text-sm leading-7 text-zinc-600 sm:text-base">{product.description}</p>
        ) : null}

        <div className="mt-8">
          <ProductSpecificationsStrip attributes={product.attributes ?? []} />
        </div>

        <div className="mt-8">
          <ProductPurchaseActions product={product} variantCartQuantities={variantCartQuantities} />
        </div>
      </div>
    </section>
  );
}
