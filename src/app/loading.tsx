import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <Container className="section-padding">
      <div className="surface-card flex min-h-80 animate-pulse flex-col gap-4 p-8">
        <div className="h-3 w-28 rounded-full bg-zinc-200" />
        <div className="h-12 w-2/3 rounded-md bg-zinc-200" />
        <div className="h-5 w-full rounded-full bg-zinc-100" />
        <div className="h-5 w-5/6 rounded-full bg-zinc-100" />
      </div>
    </Container>
  );
}
