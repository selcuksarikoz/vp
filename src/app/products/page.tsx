import { Suspense } from 'react';

import { ProductsPageContent } from '@/components/catalog/catalog-content';
import { ProductGridSkeleton } from '@/components/catalog/catalog-skeletons';
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
        <Suspense
          fallback={
            <>
              <section className="rounded-xl border border-black/10 bg-white p-6 sm:p-8 lg:p-10">
                <div className="h-4 w-28 animate-pulse rounded-full bg-zinc-100" />
                <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-zinc-100" />
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded-full bg-zinc-100" />
              </section>
              <div className="pt-8">
                <ProductGridSkeleton />
              </div>
            </>
          }
        >
          <ProductsPageContent activeCategorySlug={null} query={q ?? null} />
        </Suspense>
      </Container>
    </main>
  );
}
