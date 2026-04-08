import Link from 'next/link';
import { Suspense } from 'react';

import { HomeProducts } from '@/components/catalog/catalog-content';
import { ProductGridSkeleton } from '@/components/catalog/catalog-skeletons';
import { Container } from '@/components/ui/container';
import { HeroSlider } from '@/components/home/hero-slider';
import { getServerT } from '@/languages/server';

export default async function HomePage() {
  const t = await getServerT();

  return (
    <main className="flex flex-col gap-8">
      <Container size="full">
        <HeroSlider />
      </Container>

      <Container className="section-padding">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{t('home.featuredEyebrow')}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              {t('home.featuredTitle')}
            </h2>
          </div>
          <Link
            className="text-sm font-semibold text-zinc-950 transition hover:text-brand-700"
            href="/products"
          >
            {t('home.featuredCta')}
          </Link>
        </div>

        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <HomeProducts />
        </Suspense>
      </Container>
    </main>
  );
}
