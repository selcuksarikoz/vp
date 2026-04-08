import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDetailHero } from '@/components/catalog/product-detail-hero';
import { Container } from '@/components/ui/container';
import { ProductViewTracker } from '@/lib/analytics/components/product-view-tracker';
import {
  getCart,
  getCategories,
  getProductBySlug,
  getProductRatingState,
} from '@/lib/api/commerce';
import { getServerT } from '@/languages/server';

type ProductPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const t = await getServerT();
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: t('product.metadataNotFoundTitle'),
    };
  }

  return {
    title: product.seo?.title ?? product.name ?? product.sku ?? t('product.metadataFallbackTitle'),
    description:
      product.seo?.description ?? product.description ?? t('product.metadataFallbackDescription'),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [cart, categories, ratingState] = await Promise.all([
    getCart(),
    getCategories(),
    getProductRatingState(product.id),
  ]);
  const primaryCategoryId = product.categoryIds?.[0];
  const category = categories.find((entry) => entry.id === primaryCategoryId) ?? null;
  const variantCartQuantities = (cart.items ?? []).reduce<Record<string, number>>(
    (accumulator, item) => {
      if (item.productId !== product.id) {
        return accumulator;
      }

      const key = item.variantId || 'base';
      accumulator[key] = (accumulator[key] || 0) + (item.quantity ?? 0);

      return accumulator;
    },
    {},
  );

  return (
    <main>
      <Container className="section-padding space-y-8">
        <ProductViewTracker product={product} />
        <ProductDetailHero
          category={category}
          hasRated={ratingState.hasRated}
          product={product}
          rating={ratingState.rating}
          variantCartQuantities={variantCartQuantities}
        />
      </Container>
    </main>
  );
}
