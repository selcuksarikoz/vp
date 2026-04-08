function SkeletonLine({ className }: Readonly<{ className: string }>) {
  return <div className={`animate-pulse rounded-full bg-zinc-200 ${className}`} />;
}

export function HeaderSkeleton() {
  return (
    <div className="border-b border-black/5 bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <SkeletonLine className="h-6 w-28" />
        <div className="flex gap-3">
          <SkeletonLine className="h-10 w-10 rounded-full" />
          <SkeletonLine className="h-10 w-10 rounded-full" />
          <SkeletonLine className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function MetricsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 2 }, (_, index) => (
        <div className="rounded-xl border border-white/15 bg-white/10 p-6" key={`metric-${index}`}>
          <SkeletonLine className="h-4 w-24 bg-white/30" />
          <SkeletonLine className="mt-4 h-10 w-16 bg-white/30" />
          <SkeletonLine className="mt-4 h-4 w-full bg-white/20" />
        </div>
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: Readonly<{ count?: number }>) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          className="rounded-xl border border-black/10 bg-white p-4"
          key={`product-skeleton-${index}`}
        >
          <div className="aspect-square animate-pulse rounded-lg bg-zinc-100" />
          <SkeletonLine className="mt-4 h-4 w-24" />
          <SkeletonLine className="mt-3 h-8 w-3/4" />
          <SkeletonLine className="mt-3 h-4 w-full" />
          <SkeletonLine className="mt-2 h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export function CategoryPageSkeleton() {
  return (
    <>
      <section className="rounded-xl border border-black/10 bg-white p-6 sm:p-8 lg:p-10">
        <SkeletonLine className="h-4 w-28" />
        <SkeletonLine className="mt-4 h-4 w-full" />
        <SkeletonLine className="mt-2 h-4 w-3/4" />
      </section>
      <div className="pt-8">
        <ProductGridSkeleton />
      </div>
    </>
  );
}
