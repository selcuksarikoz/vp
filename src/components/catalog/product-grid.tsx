import type { Product } from '@/types/commerce';

import { getProductRating } from '@/lib/api/commerce';

import { ProductCard } from './product-card';

type ProductGridProps = Readonly<{
  products: Product[];
}>;

export async function ProductGrid({ products }: ProductGridProps) {
  const productRatings = await Promise.all(
    products.map(async (product) => ({
      product,
      rating: await getProductRating(product.id),
    })),
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {productRatings.map(({ product, rating }) => (
        <ProductCard
          key={product.id ?? product.slug ?? product.name}
          product={product}
          rating={rating}
        />
      ))}
    </div>
  );
}
