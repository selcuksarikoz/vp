import { getCart, getCategories } from '@/lib/api/commerce';

import { CatalogHeaderClient } from './catalog-header-client';

function getCartCount(items: Awaited<ReturnType<typeof getCart>>['items']) {
  return (items ?? []).reduce((sum, item) => sum + (item.quantity ?? 1), 0);
}

export async function CatalogHeader() {
  const [categories, cart] = await Promise.all([getCategories(), getCart()]);
  const cartCount = getCartCount(cart.items);

  return <CatalogHeaderClient cartCount={cartCount} categories={categories} />;
}
