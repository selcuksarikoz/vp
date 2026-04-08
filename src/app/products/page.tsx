import { Suspense } from 'react';

import { ProductsPageContent } from '@/components/catalog/catalog-content';
import { CategoryPageSkeleton } from '@/components/catalog/catalog-skeletons';
import { Container } from '@/components/ui/container';

type ProductsPageProps = Readonly<{
  searchParams: Promise<{
    q?: string;
  }>;
}>;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { q } = await searchParams;

  return (
    <main>
      <Container className="section-padding">
        <Suspense fallback={<CategoryPageSkeleton />}>
          <ProductsPageContent activeCategorySlug={null} query={q ?? null} />
        </Suspense>
      </Container>
    </main>
  );
}
