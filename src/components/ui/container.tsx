import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { clsx } from 'clsx';

const containerVariants = cva('', {
  variants: {
    size: {
      full: 'min-w-screen min-h-screen',
      regular: 'w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto',
    },
  },
  defaultVariants: {
    size: 'regular',
  },
});

type ContainerProps = Readonly<{
  children: ReactNode;
  className?: string;
}> &
  VariantProps<typeof containerVariants>;

export function Container({ children, className, size }: ContainerProps) {
  return <div className={clsx(containerVariants({ size }), className)}>{children}</div>;
}
