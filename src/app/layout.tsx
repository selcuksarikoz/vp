import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { ViewTransitions } from 'next-view-transitions';

import { CatalogFooter } from '@/components/catalog/catalog-footer';
import { CatalogHeader } from '@/components/catalog/catalog-header';
import { HeaderSkeleton } from '@/components/catalog/catalog-skeletons';
import { ANALYTICS_CONSTANTS } from '@/constants/analytics';
import { DEFAULT_LANGUAGE } from '@/constants/i18n';
import { getServerT } from '@/languages/server';
import { TENANT_CONFIG } from '@/lib/config/tenant';

import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const siteName = TENANT_CONFIG.name ?? t('site.name');

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: t('site.description'),
    icons: {
      icon: '/favicon.ico',
    },
  };
}

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html data-theme={TENANT_CONFIG.theme} lang={DEFAULT_LANGUAGE}>
        <body className={`${inter.variable} font-sans`}>
          {ANALYTICS_CONSTANTS.gtmId ? (
            <GoogleTagManager
              dataLayerName={ANALYTICS_CONSTANTS.dataLayerName}
              gtmId={ANALYTICS_CONSTANTS.gtmId}
            />
          ) : null}
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Suspense fallback={<HeaderSkeleton />}>
                <CatalogHeader />
              </Suspense>
              <div className="flex-1">{children}</div>
              <CatalogFooter />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
