'use client';

import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

type ErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function Error({ error, reset }: ErrorProps) {
  const { t } = useTranslation();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="surface-card w-full p-8">
        <p className="eyebrow">{t('system.error.eyebrow')}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">
          {t('system.error.title')}
        </h1>
        <p className="mt-4 text-sm leading-6 text-zinc-600">{error.message}</p>
        <Button className="mt-8" onClick={() => reset()} size="lg" variant="primary">
          {t('system.error.retry')}
        </Button>
      </div>
    </main>
  );
}
