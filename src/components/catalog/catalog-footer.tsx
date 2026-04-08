import Link from 'next/link';
import { AtSign, Globe, Send } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { CurrentYear } from '@/components/ui/current-year';
import { getCategories } from '@/lib/api/commerce';
import { resolveCategoryHref, resolveCategoryLabel } from '@/lib/commerce/presentation';
import { getServerT } from '@/languages/server';
import { TENANT_CONFIG } from '@/lib/config/tenant';

export async function CatalogFooter() {
  const t = await getServerT();
  const categories = await getCategories();
  const siteName = TENANT_CONFIG.name ?? t('site.name');

  return (
    <footer className="border-t border-black/5 bg-white">
      {/* Top Footer Area */}
      <Container className="py-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Site Branding */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {siteName}
            </p>
            <p className="mt-3 max-w-sm text-2xl font-semibold tracking-tight text-zinc-950">
              {t('site.tagline')}
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">{t('site.description')}</p>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-950">
              {t('footer.sections.navigation')}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { href: '/', label: t('footer.links.0.label') },
                { href: '/products', label: t('footer.links.1.label') },
                { href: '/account', label: t('footer.links.2.label') },
                { href: '/cart', label: t('footer.links.3.label') },
              ].map((link) => (
                <Link
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-950">
              {t('footer.sections.categories')}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {categories.map((category, index) => {
                const label = resolveCategoryLabel(
                  category,
                  t('footer.categoryFallbackPrefix'),
                  index,
                );

                return (
                  <Link
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                    href={resolveCategoryHref(category)}
                    key={category.id ?? category.slug ?? label}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-black/5">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            © <CurrentYear /> {siteName}
          </p>
          <div className="flex items-center gap-3">
            <Link
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              href="https://instagram.com"
              rel="noreferrer"
              target="_blank"
            >
              <Globe className="h-4 w-4" />
            </Link>
            <Link
              aria-label="X"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              href="https://x.com"
              rel="noreferrer"
              target="_blank"
            >
              <AtSign className="h-4 w-4" />
            </Link>
            <Link
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              href="https://linkedin.com"
              rel="noreferrer"
              target="_blank"
            >
              <Send className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
