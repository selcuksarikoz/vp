import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import { ProductsPageContent } from '@/components/catalog/catalog-content';
import { ProductGridSkeleton } from '@/components/catalog/catalog-skeletons';
import { Container } from '@/components/ui/container';
import { getCategoryBySlug } from '@/lib/api/commerce';
import { getServerT } from '@/languages/server';

type CategoryPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}>;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const t = await getServerT();
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: t('listing.categoryNotFoundTitle'),
    };
  }

  const categoryName = category.name ?? category.slug ?? category.id ?? 'category';

  return {
    title: `${categoryName} ${t('listing.categoryMetadataSuffix')}`,
    description: t('listing.categoryMetadataDescription', { categoryName }),
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { q } = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  if (category.href) {
    redirect(category.href);
  }

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
          <ProductsPageContent activeCategorySlug={slug} query={q ?? null} />
        </Suspense>
      </Container>
    </main>
  );
}
