'use client';

import { Minus, Plus } from 'lucide-react';

import { clsx } from 'clsx';

type QuantityStepperTone = 'default' | 'inverse';

type QuantityStepperProps = Readonly<{
  className?: string;
  decreaseLabel: string;
  disabled?: boolean;
  increaseLabel: string;
  max?: number;
  min?: number;
  onDecrease: () => void;
  onIncrease: () => void;
  tone?: QuantityStepperTone;
  value: number;
}>;

const shellClasses: Record<QuantityStepperTone, string> = {
  default: 'border-black/10 bg-white text-zinc-950',
  inverse: 'border-white/20 bg-white/10 text-white',
};

const buttonClasses: Record<QuantityStepperTone, string> = {
  default: 'hover:bg-zinc-950 hover:text-white',
  inverse: 'hover:bg-white hover:text-zinc-950',
};

export function QuantityStepper({
  className,
  decreaseLabel,
  disabled = false,
  increaseLabel,
  max = 99,
  min = 1,
  onDecrease,
  onIncrease,
  tone = 'default',
  value,
}: QuantityStepperProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center overflow-hidden rounded-full border',
        shellClasses[tone],
        className,
      )}
    >
      <button
        aria-label={decreaseLabel}
        className={clsx(
          'flex h-12 w-12 items-center justify-center border-r border-current/10 transition-colors disabled:opacity-40',
          buttonClasses[tone],
        )}
        disabled={disabled || value <= min}
        onClick={onDecrease}
        type="button"
      >
        <Minus className="h-4 w-4" />
      </button>
      <div className="min-w-14 px-5 text-center text-lg font-semibold tabular-nums">{value}</div>
      <button
        aria-label={increaseLabel}
        className={clsx(
          'flex h-12 w-12 items-center justify-center border-l border-current/10 transition-colors disabled:opacity-40',
          buttonClasses[tone],
        )}
        disabled={disabled || value >= max}
        onClick={onIncrease}
        type="button"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
