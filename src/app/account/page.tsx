import { UserRound } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { getServerT } from '@/languages/server';

export default async function AccountPage() {
  const t = await getServerT();

  return (
    <Container className="section-padding flex justify-center">
      <section className="surface-card w-full max-w-md p-6 sm:p-8 lg:p-10">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand-100">
            <UserRound className="h-5 w-5 text-zinc-950" />
          </div>
          <p className="eyebrow mt-6">{t('account.eyebrow')}</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {t('account.title')}
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-600">{t('account.description')}</p>
        </div>

        {/* Dummy Login Form */}
        <form className="mt-8 space-y-5" action={undefined}>
          <div>
            <label className="block text-sm font-medium text-zinc-950" htmlFor="email">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="hello@example.com"
                className="block w-full rounded-md border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-950"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-zinc-950" htmlFor="password">
                Password
              </label>
              <a
                href="#"
                className="text-sm font-medium text-brand-700 hover:text-brand-600 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="block w-full rounded-md border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-950"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="button" variant="primary" fullWidth size="lg">
              Sign in
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-600">
            Not a member?
            <a
              href="#"
              className="font-semibold text-zinc-950 transition-colors hover:text-brand-700"
            >
              Create an account
            </a>
          </p>
        </form>
      </section>
    </Container>
  );
}
