import { Suspense } from 'react';

import { ProductsPageContent } from '@/components/catalog/catalog-content';
import { CategoryPageSkeleton } from '@/components/catalog/catalog-skeletons';
import { Container } from '@/components/ui/container';

type ProductsPageProps = Readonly<{
  searchParams: Promise<{
    q?: string;
  }>;
}>;

async function ProductsListingContent({
  queryPromise,
}: Readonly<{
  queryPromise: ProductsPageProps['searchParams'];
}>) {
  const { q } = await queryPromise;

  return <ProductsPageContent activeCategorySlug={null} query={q ?? null} />;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <main>
      <Container className="section-padding">
        <Suspense fallback={<CategoryPageSkeleton />}>
          <ProductsListingContent queryPromise={searchParams} />
        </Suspense>
      </Container>
    </main>
  );
}
