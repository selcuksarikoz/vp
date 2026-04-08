import { Container } from '@/components/ui/container';
import { MetricsSkeleton, ProductGridSkeleton } from '@/components/catalog/catalog-skeletons';

export default function Loading() {
  return (
    <Container className="section-padding">
      <div className="surface-card flex min-h-80 flex-col gap-4 p-8">
        <MetricsSkeleton />
        <ProductGridSkeleton count={4} />
      </div>
    </Container>
  );
}
