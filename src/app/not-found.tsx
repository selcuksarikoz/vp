import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { getServerT } from '@/languages/server';

export default async function NotFound() {
  const t = await getServerT();

  return (
    <Container className="section-padding">
      <div className="surface-card p-8 sm:p-10">
        <p className="eyebrow">{t('system.notFound.eyebrow')}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
          {t('system.notFound.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">
          {t('system.notFound.description')}
        </p>
        <Button className="mt-8" href="/products" size="lg" variant="primary">
          {t('system.notFound.cta')}
        </Button>
      </div>
    </Container>
  );
}
