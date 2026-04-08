import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { clsx } from 'clsx';

const navItemVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium tracking-tight transition-colors',
  {
    variants: {
      active: {
        false: '',
        true: '',
      },
      tone: {
        chrome: 'px-2 py-1 text-white/72 hover:text-white data-[active=true]:text-white',
        surface: 'px-2 py-1 text-zinc-600 hover:text-zinc-950 data-[active=true]:text-zinc-950',
      },
    },
    defaultVariants: {
      active: false,
      tone: 'surface',
    },
  },
);

type NavItemProps = Omit<ComponentProps<typeof Link>, 'className' | 'children'> &
  VariantProps<typeof navItemVariants> & {
    children: ReactNode;
    className?: string;
  };

export function NavItem({ active, children, className, tone, ...props }: NavItemProps) {
  return (
    <Link
      {...props}
      className={clsx(navItemVariants({ active, tone }), className)}
      data-active={active ? 'true' : 'false'}
    >
      {children}
    </Link>
  );
}
