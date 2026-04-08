'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';

import type { Category } from '@/types/commerce';

import { Container } from '@/components/ui/container';
import { IconButton } from '@/components/ui/icon-button';
import { Logo } from '@/components/ui/logo';
import { NavItem } from '@/components/ui/nav-item';
import {
  HeaderCountBadge,
  HeaderMobileMenu,
  HeaderSearchPanel,
} from '@/components/catalog/catalog-header-parts';
import { resolveCategoryHref, resolveCategoryLabel } from '@/lib/commerce/presentation';

type CatalogHeaderClientProps = Readonly<{
  cartCount: number;
  categories: Category[];
}>;

type HeaderCategoryItem = {
  href: string;
  key: string;
  label: string;
};

export function CatalogHeaderClient({ cartCount, categories }: CatalogHeaderClientProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const categoryItems = useMemo<HeaderCategoryItem[]>(
    () =>
      categories.map((category, index) => ({
        href: resolveCategoryHref(category),
        key: category.id ?? category.slug ?? `category-${index + 1}`,
        label: resolveCategoryLabel(category, t('header.categoryFallbackPrefix'), index),
      })),
    [categories, t],
  );

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-black/5 chrome-surface text-white">
        <Container>
          <div className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4 py-3">
            {/* Logo Area */}
            <Logo imageClassName="h-7 w-auto" />

            {/* Desktop Navigation */}
            <nav className="hidden items-center justify-center gap-1 xl:flex">
              {categoryItems.map((item) => (
                <NavItem
                  active={pathname === item.href}
                  href={item.href}
                  key={item.key}
                  onClick={() => setIsSearchOpen(false)}
                  tone="chrome"
                >
                  {item.label}
                </NavItem>
              ))}
            </nav>

            {/* Header Actions Area */}
            <div className="flex items-center justify-end gap-1">
              <IconButton
                active={isSearchOpen}
                aria-expanded={isSearchOpen}
                aria-label={isSearchOpen ? t('header.closeSearch') : t('header.openSearch')}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen((current) => !current);
                }}
              >
                <Search className="h-4 w-4" />
              </IconButton>

              <IconButton aria-label={t('header.viewCart')} className="relative" href="/cart">
                <ShoppingBag className="h-4 w-4" />
                <HeaderCountBadge count={cartCount} />
              </IconButton>

              <div className="hidden xl:flex">
                <IconButton aria-label={t('header.account')} href="/account">
                  <UserRound className="h-4 w-4" />
                </IconButton>
              </div>

              <IconButton
                active={isMenuOpen}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
                className="xl:hidden"
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsMenuOpen((current) => !current);
                }}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </IconButton>
            </div>
          </div>
        </Container>

        {/* Search Panel Overlay */}
        <HeaderSearchPanel isOpen={isSearchOpen} placeholder={t('header.searchPlaceholder')} />
      </header>

      {/* Mobile Menu Overlay */}
      <HeaderMobileMenu
        accountLabel={t('header.account')}
        closeLabel={t('header.closeMenu')}
        isOpen={isMenuOpen}
        items={categoryItems}
        menuTitle={t('header.menuTitle')}
        onClose={() => setIsMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
