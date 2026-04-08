'use client';

import Link from 'next/link';
import { Search, UserRound, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { IconButton } from '@/components/ui/icon-button';
import { clsx } from 'clsx';

export function HeaderCountBadge({ count }: { count: number }) {
  if (!count) {
    return null;
  }

  return (
    <Badge className="absolute -right-2.5 -top-2.5" size="sm" variant="white">
      {count}
    </Badge>
  );
}

export function HeaderSearchForm({
  className,
  placeholder,
}: Readonly<{
  className?: string;
  placeholder: string;
}>) {
  return (
    <form action="/products" className={className}>
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          className="h-11 w-full rounded-sm border border-black/10 bg-white pl-11 pr-4 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-950"
          name="q"
          placeholder={placeholder}
          type="search"
        />
      </label>
    </form>
  );
}

type HeaderMobileMenuProps = Readonly<{
  accountLabel: string;
  closeLabel: string;
  isOpen: boolean;
  items: Array<{
    href: string;
    key: string;
    label: string;
  }>;
  menuTitle: string;
  pathname: string | null;
  onClose: () => void;
}>;

export function HeaderMobileMenu({
  accountLabel,
  closeLabel,
  isOpen,
  items,
  menuTitle,
  pathname,
  onClose,
}: HeaderMobileMenuProps) {
  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-zinc-950/25 transition xl:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      {/* Mobile Menu Sidebar */}
      <aside
        className={clsx(
          'fixed right-0 top-0 z-50 h-dvh w-full bg-white transition-transform duration-300 xl:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-950">
              {menuTitle}
            </p>
            <IconButton
              aria-label={closeLabel}
              className="border-black/10 bg-white text-zinc-950"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </IconButton>
          </div>

          {/* Sidebar Navigation Links */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav className="grid gap-4">
              {items.map((item) => (
                <Link
                  className={clsx(
                    'border-b border-black/10 pb-4 text-base font-medium text-zinc-950 transition-colors hover:text-brand-700',
                    pathname === item.href ? 'text-brand-700' : '',
                  )}
                  href={item.href}
                  key={item.key}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer Area */}
          <div className="border-t border-black/10 px-5 py-5">
            <Link
              className="flex items-center gap-3 text-sm font-medium text-zinc-950 transition-colors hover:text-brand-700"
              href="/account"
              onClick={onClose}
            >
              <UserRound className="h-4 w-4" />
              <span>{accountLabel}</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export function HeaderSearchPanel({
  isOpen,
  placeholder,
}: Readonly<{
  isOpen: boolean;
  placeholder: string;
}>) {
  return (
    <div
      className={clsx(
        'overflow-hidden border-t border-white/12 transition-all duration-300',
        isOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0',
      )}
    >
      <Container className="py-4">
        <HeaderSearchForm className="w-full" placeholder={placeholder} />
      </Container>
    </div>
  );
}
