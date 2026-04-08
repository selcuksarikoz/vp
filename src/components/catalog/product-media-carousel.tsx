'use client';

import Image from 'next/image';

import type { ProductImage } from '@/types/commerce';

import { Slider } from '@/components/ui/slider';

type ProductMediaCarouselProps = Readonly<{
  fallbackLabel: string;
  images?: ProductImage[];
  productName: string;
  productId: string;
}>;

export function ProductMediaCarousel({
  fallbackLabel,
  images = [],
  productName,
  productId,
}: ProductMediaCarouselProps) {
  const slides = images.length
    ? images.map((image, index) => ({
        ...image,
        id: `${image.url ?? 'image'}-${index}`,
      }))
    : [
        {
          id: 'empty',
          url: undefined,
          alt: undefined,
        },
      ];
  const items = slides.map((slide, index) => ({
    content: slide.url ? (
      <Image
        alt={slide.alt ?? productName}
        className="rounded-lg object-contain p-4 sm:p-6"
        decoding="async"
        fill
        loading={index === 0 ? 'eager' : 'lazy'}
        priority={index === 0}
        sizes="(min-width: 1280px) 36vw, 100vw"
        src={slide.url}
        style={index === 0 ? { viewTransitionName: `product-image-${productId}` } : undefined}
      />
    ) : (
      <div className="flex h-full items-center justify-center bg-zinc-50">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {fallbackLabel}
        </span>
      </div>
    ),
    id: slide.id,
  }));

  return (
    <div className="rounded-xl border border-black/10 bg-white p-3 sm:p-4">
      <Slider
        ariaLabelPrefix={`${productName} slide`}
        className="w-full"
        dotClassName="h-2 w-2"
        items={items}
        viewportClassName="relative aspect-[4/3] rounded-lg lg:aspect-[5/4]"
      />
    </div>
  );
}
