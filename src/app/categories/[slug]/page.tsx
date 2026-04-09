import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import { ProductsPageContent } from '@/components/catalog/catalog-content';
import { CategoryPageSkeleton } from '@/components/catalog/catalog-skeletons';
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

async function CategoryProductsPageContent({
  queryPromise,
  slug,
}: Readonly<{
  queryPromise: CategoryPageProps['searchParams'];
  slug: string;
}>) {
  const { q } = await queryPromise;

  return <ProductsPageContent activeCategorySlug={slug} query={q ?? null} />;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  if (category.href) {
    redirect(category.href);
  }

  return (
    <Container className="section-padding">
      <Suspense fallback={<CategoryPageSkeleton />}>
        <CategoryProductsPageContent queryPromise={searchParams} slug={slug} />
      </Suspense>
    </Container>
  );
}
