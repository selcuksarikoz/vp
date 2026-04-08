import { formatCurrency } from '@/lib/format/currency';
import { clsx } from 'clsx';

type PriceProps = Readonly<{
  amount: number | null | undefined;
  className?: string;
  currency?: string;
  note?: string | null;
  size?: 'default' | 'hero';
  tone?: 'default' | 'inverse';
}>;

const amountClasses = {
  default: 'text-lg font-semibold sm:text-xl',
  hero: 'text-3xl font-semibold tracking-tight sm:text-4xl',
} as const;

const toneClasses = {
  default: 'text-zinc-950',
  inverse: 'text-white',
} as const;

const noteClasses = {
  default: 'mt-1 text-sm text-zinc-500',
  inverse: 'mt-2 text-sm text-white/70',
} as const;

export function Price({
  amount,
  className,
  currency,
  note,
  size = 'default',
  tone = 'default',
}: PriceProps) {
  return (
    <div className={className}>
      <p className={clsx(amountClasses[size], toneClasses[tone])}>
        {formatCurrency(amount, currency)}
      </p>
      {note ? <p className={noteClasses[tone]}>{note}</p> : null}
    </div>
  );
}
