import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';

import { clsx } from 'clsx';

const iconButtonVariants = cva(
  'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500',
  {
    variants: {
      active: {
        false: 'border-white/20 bg-white text-zinc-950 hover:bg-brand-100',
        true: 'border-brand-100 bg-brand-100 text-zinc-950',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

type SharedIconButtonProps = {
  children: ReactNode;
  className?: string;
} & IconButtonVariantProps;

type LinkIconButtonProps = SharedIconButtonProps &
  Omit<ComponentProps<typeof Link>, 'children' | 'className'> & {
    href: string;
  };

type NativeIconButtonProps = SharedIconButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: never;
  };

type IconButtonProps = LinkIconButtonProps | NativeIconButtonProps;

function isLinkProps(props: IconButtonProps): props is LinkIconButtonProps {
  return 'href' in props && typeof props.href === 'string';
}

export function IconButton(props: IconButtonProps) {
  if (isLinkProps(props)) {
    const { active, children, className, ...linkProps } = props;

    return (
      <Link {...linkProps} className={clsx(iconButtonVariants({ active }), className)}>
        {children}
      </Link>
    );
  }

  const { active, children, className, type = 'button', ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={clsx(iconButtonVariants({ active }), className)}
      type={type}
    >
      {children}
    </button>
  );
}
