'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { clsx } from 'clsx';

type SliderItem = {
  content: ReactNode;
  id: string;
};

type SliderProps = Readonly<{
  ariaLabelPrefix: string;
  className?: string;
  dotClassName?: string;
  items: SliderItem[];
  showArrows?: boolean;
  trackClassName?: string;
  viewportClassName?: string;
}>;

export function Slider({
  ariaLabelPrefix,
  className,
  dotClassName,
  items,
  showArrows = true,
  trackClassName,
  viewportClassName,
}: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  const canNavigate = items.length > 1;

  return (
    <div className={clsx('group', className)}>
      <div className={clsx('relative overflow-hidden', viewportClassName)}>
        <div
          className={clsx('flex transition-transform duration-500 ease-out h-full', trackClassName)}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div className="relative h-full shrink-0 basis-full" key={item.id}>
              {item.content}
            </div>
          ))}
        </div>

        {canNavigate && showArrows ? (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              aria-label={`${ariaLabelPrefix} previous`}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 bg-white/92 text-zinc-950 transition-colors hover:border-zinc-950"
              onClick={() =>
                setActiveIndex((current) => (current - 1 + items.length) % items.length)
              }
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              aria-label={`${ariaLabelPrefix} next`}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 bg-white/92 text-zinc-950 transition-colors hover:border-zinc-950"
              onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
              type="button"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      {canNavigate ? (
        <div className="mt-3 flex items-center justify-center gap-2 px-2 pb-1">
          {items.map((item, index) => (
            <button
              aria-label={`${ariaLabelPrefix} ${index + 1}`}
              className={clsx(
                'h-3 w-3 rounded-full transition-colors',
                index === activeIndex ? 'bg-zinc-950' : 'bg-zinc-300 hover:bg-zinc-500',
                dotClassName,
              )}
              key={item.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
