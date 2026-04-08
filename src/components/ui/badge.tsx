import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-black/8 bg-zinc-50 text-zinc-600',
        brand: 'border border-white bg-brand-500 text-white font-bold',
        surface: 'bg-zinc-200/50 text-zinc-600',
        white: 'border border-white/70 bg-white text-brand-600 font-semibold',
        dark: 'border border-black/10 bg-zinc-950 text-white',
        outline: 'border border-white/20 bg-white text-zinc-950',
      },
      size: {
        sm: 'h-5 min-w-[20px] px-1.5 text-[11px]',
        md: 'px-2 py-1 text-[11px]',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type BadgeProps = Readonly<{
  children: ReactNode;
  className?: string;
}> &
  VariantProps<typeof badgeVariants>;

export function Badge({ children, className, size, variant }: BadgeProps) {
  return <span className={cn(badgeVariants({ size, variant }), className)}>{children}</span>;
}
