import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';

import { clsx } from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      fullWidth: {
        false: '',
        true: 'w-full',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-5 text-sm',
        icon: 'h-11 w-11 p-0',
        iconSm: 'h-9 w-9 p-0 text-sm',
      },
      variant: {
        primary:
          'border border-zinc-950 bg-zinc-950 text-white hover:border-brand-700 hover:bg-brand-700',
        light: 'border border-white bg-white text-zinc-950 hover:bg-sand-100',
        outline:
          'border border-black/10 bg-white text-zinc-950 hover:border-zinc-950 hover:bg-sand-50',
        glass: 'border border-white/20 bg-white/10 text-white hover:bg-white/15',
        glassActive: 'border border-white bg-white text-zinc-950',
        chip: 'border border-black/10 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950',
        chipActive: 'border border-zinc-950 bg-zinc-950 text-white',
        soft: 'border border-transparent bg-sand-100 text-zinc-950 hover:bg-sand-200',
      },
    },
    defaultVariants: {
      fullWidth: false,
      size: 'md',
      variant: 'primary',
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonVariantProps;

type LinkButtonProps = SharedButtonProps &
  Omit<ComponentProps<typeof Link>, 'className' | 'children'> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

function isLinkProps(props: ButtonProps): props is LinkButtonProps {
  return 'href' in props && typeof props.href === 'string';
}

export function Button(props: ButtonProps) {
  if (isLinkProps(props)) {
    const { children, className, fullWidth, size, variant, ...linkProps } = props;

    return (
      <Link
        {...linkProps}
        className={clsx(buttonVariants({ fullWidth, size, variant }), className)}
      >
        {children}
      </Link>
    );
  }

  const { children, className, fullWidth, size, type = 'button', variant, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={clsx(buttonVariants({ fullWidth, size, variant }), className)}
      type={type}
    >
      {children}
    </button>
  );
}
