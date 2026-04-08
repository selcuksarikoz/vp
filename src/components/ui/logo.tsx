import Image from 'next/image';
import Link from 'next/link';

import { clsx } from 'clsx';

import { TENANT_CONFIG } from '@/lib/config/tenant';

type LogoProps = Readonly<{
  className?: string;
  imageClassName?: string;
}>;

export function Logo({ className, imageClassName }: LogoProps) {
  const brandName = TENANT_CONFIG.name ?? 'Vape Paradise';

  return (
    <Link
      aria-label={`${brandName} home`}
      className={clsx('inline-flex shrink-0 items-center', className)}
      href="/"
    >
      <Image
        alt={brandName}
        className={clsx('h-7 w-auto sm:h-8 xl:h-9', imageClassName)}
        decoding="async"
        height={39}
        priority
        src={TENANT_CONFIG.logo}
        width={214}
      />
    </Link>
  );
}
