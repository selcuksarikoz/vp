import { ProductGrid } from '@/components/catalog/product-grid';
import { Badge } from '@/components/ui/badge';
import { getCatalogProducts, getCategoryBySlug, getProducts } from '@/lib/api/commerce';
import { getServerT } from '@/languages/server';

export async function HomeProducts() {
  const products = await getProducts();

  return <ProductGrid products={products.slice(0, 4)} />;
}

export async function ProductsPageContent({
  activeCategorySlug,
  query,
}: Readonly<{
  activeCategorySlug: string | null;
  query: string | null;
}>) {
  const t = await getServerT();
  const [products, activeCategory] = await Promise.all([
    getCatalogProducts({
      categorySlug: activeCategorySlug,
      query,
    }),
    getCategoryBySlug(activeCategorySlug),
  ]);
  const categoryName =
    activeCategory?.name ??
    activeCategory?.slug ??
    activeCategory?.id ??
    t('listing.categoryFallbackPrefix');
  const title = query
    ? t('listing.queryTitle', { query })
    : activeCategorySlug
      ? t('listing.categoryTitle', { categoryName })
      : t('listing.allProducts');
  const description = query
    ? t('listing.queryDescription')
    : activeCategorySlug
      ? t('listing.categoryDescription', { categoryName })
      : t('listing.allProductsDescription');

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="mb-4 sm:mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              {title}
            </h1>
            <Badge className="h-7 px-3" size="lg" variant="surface">
              {products.length}
            </Badge>
          </div>
          <p className="mt-4 text-base leading-7 text-zinc-600">{description}</p>
        </div>
      </section>

      {/* Products Grid or Empty State */}
      {products.length ? (
        <ProductGrid products={products} />
      ) : (
        <section className="rounded-xl border border-dashed border-black/10 bg-white p-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
            {query ? t('listing.emptyFoundTitle') : t('listing.emptyAvailableTitle')}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {query ? t('listing.emptyFoundDescription') : t('listing.emptyAvailableDescription')}
          </p>
        </section>
      )}
    </div>
  );
}
