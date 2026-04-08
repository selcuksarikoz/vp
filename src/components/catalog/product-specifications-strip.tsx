import { BatteryFull, Droplets, Flame, Grid2x2, Sparkles } from 'lucide-react';

import type { ProductAttribute } from '@/types/commerce';

type ProductSpecificationsStripProps = Readonly<{
  attributes: ProductAttribute[];
}>;

function normalizeAttributeLabel(attribute: ProductAttribute) {
  return attribute.name ?? attribute.value ?? '';
}

function resolveAttributeIcon(attribute: ProductAttribute) {
  const haystack = `${attribute.name ?? ''} ${attribute.value ?? ''}`.toLowerCase();

  if (haystack.includes('kapaz') || haystack.includes('ml')) {
    return Droplets;
  }

  if (haystack.includes('zug') || haystack.includes('puff')) {
    return Flame;
  }

  if (haystack.includes('coil') || haystack.includes('mesh')) {
    return Grid2x2;
  }

  if (haystack.includes('batter')) {
    return BatteryFull;
  }

  if (haystack.includes('geschmack') || haystack.includes('flavor')) {
    return Sparkles;
  }

  return Sparkles;
}

export function ProductSpecificationsStrip({ attributes }: ProductSpecificationsStripProps) {
  if (!attributes.length) {
    return null;
  }

  const visibleAttributes = attributes.slice(0, 5);
  return (
    <>
      {/* Specifications Grid */}
      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
        {visibleAttributes.map((attribute, index) => {
          const Icon = resolveAttributeIcon(attribute);
          const label = normalizeAttributeLabel(attribute);
          const value =
            attribute.value && attribute.value !== attribute.name ? attribute.value : null;

          return (
            <div
              className="flex min-h-28 flex-col items-center justify-start gap-2 rounded-md border border-black/6 bg-zinc-50 px-3 py-3 text-center"
              key={`${attribute.name ?? attribute.value ?? 'attribute'}-${index}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-black/8 bg-white">
                <Icon className="h-4.5 w-4.5 text-zinc-950" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 space-y-0.5">
                <p className="text-sm font-semibold leading-5 tracking-tight text-zinc-950">
                  {value ?? label}
                </p>
                <p className="text-xs leading-4 text-zinc-500">{value ? label : null}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
