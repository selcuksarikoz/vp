import { productCollectionSchema, productSchema } from '@/lib/schemas/commerce';
import type { Product } from '@/types/commerce';

import { getCategoryFilterIds } from './categories';
import { buildResourcePath, readParsed } from './shared';

/**
 * @description Fetches all products from the mocked API.
 * @returns The product collection.
 */
export async function getProducts(): Promise<Product[]> {
  return readParsed('/products', {
    fallback: [],
    schema: productCollectionSchema,
    tags: ['products'],
  });
}

/**
 * @description Fetches a product by slug.
 * @param slug The product slug.
 * @returns The matched product or `null`.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await readParsed(buildResourcePath('/products', { slug }), {
    fallback: [],
    schema: productCollectionSchema,
    tags: ['products'],
  });

  return products[0] ?? null;
}

/**
 * @description Fetches catalog products and applies optional category and query filters.
 * @param options Optional filter values.
 * @returns The filtered product collection.
 */
export async function getCatalogProducts(options?: {
  categorySlug?: string | null;
  query?: string | null;
}): Promise<Product[]> {
  const normalizedQuery = options?.query?.trim() ?? '';
  const path = buildResourcePath('/products', {
    q: normalizedQuery || null,
  });
  const products = await readParsed(path, {
    fallback: [],
    schema: productCollectionSchema,
    tags: ['products'],
  });

  if (!options?.categorySlug) {
    return products;
  }

  const categoryIds = await getCategoryFilterIds(options.categorySlug);

  if (!categoryIds.length) {
    return [];
  }

  return products.filter((product) =>
    (product.categoryIds ?? []).some((categoryId) => categoryIds.includes(categoryId)),
  );
}

/**
 * @description Fetches products for a category slug.
 * @param slug The category slug.
 * @returns The matching product collection.
 */
export async function getProductsByCategorySlug(slug: string | null): Promise<Product[]> {
  if (!slug) {
    return getProducts();
  }

  return getCatalogProducts({ categorySlug: slug });
}

/**
 * @description Fetches a single product by id.
 * @param id The product id.
 * @returns The matched product or `null`.
 */
async function getProductById(id: string): Promise<Product | null> {
  return readParsed(`/products/${id}`, {
    fallback: null,
    schema: productSchema.nullable(),
    tags: ['products', 'cart'],
  });
}

/**
 * @description Fetches a unique set of products by id.
 * @param productIds The product ids to resolve.
 * @returns The matching products.
 */
export async function getProductsByIds(productIds: string[]): Promise<Product[]> {
  if (!productIds.length) {
    return [];
  }

  const uniqueIds = Array.from(new Set(productIds));

  if (uniqueIds.length === 1) {
    const product = await getProductById(uniqueIds[0]);

    return product ? [product] : [];
  }

  const productIdSet = new Set(uniqueIds);
  const products = await getProducts();

  return products.filter((product): product is Product =>
    Boolean(product?.id && productIdSet.has(product.id)),
  );
}
