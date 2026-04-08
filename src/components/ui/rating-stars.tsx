'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

import { clsx } from 'clsx';

type RatingStarsProps = Readonly<{
  ariaLabelPrefix?: string;
  className?: string;
  onSelect?: (value: number) => void;
  size?: number;
  tone?: 'default' | 'inverse';
  value: number | null | undefined;
}>;

export function RatingStars({
  ariaLabelPrefix = 'Rate',
  className,
  onSelect,
  size = 18,
  tone = 'default',
  value,
}: RatingStarsProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const activeCount = Math.max(0, Math.min(5, Math.round(value ?? 0)));
  const previewCount = hoveredValue ?? activeCount;
  const activeClass = tone === 'inverse' ? 'text-amber-300' : 'text-amber-500';
  const inactiveClass = tone === 'inverse' ? 'text-white/25' : 'text-zinc-300';
  const isInteractive = typeof onSelect === 'function';

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }, (_, index) => {
        const isActive = index < previewCount;
        const star = (
          <Star
            className={clsx(
              'transition-colors duration-150',
              isActive ? activeClass : inactiveClass,
            )}
            fill={isActive ? 'currentColor' : 'none'}
            size={size}
            strokeWidth={1.8}
          />
        );

        if (!isInteractive) {
          return <span key={`star-${index + 1}`}>{star}</span>;
        }

        return (
          <button
            aria-label={`${ariaLabelPrefix} ${index + 1}`}
            className="transition-transform duration-150 hover:scale-105"
            key={`star-${index + 1}`}
            onBlur={() => setHoveredValue(null)}
            onClick={() => onSelect(index + 1)}
            onMouseEnter={() => setHoveredValue(index + 1)}
            onMouseLeave={() => setHoveredValue(null)}
            onFocus={() => setHoveredValue(index + 1)}
            type="button"
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
