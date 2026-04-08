import type { Category, Product } from '@/types/commerce';

/**
 * @description Resolves the display name for a product with safe fallbacks.
 * @param product The product to label.
 * @param fallbackName The fallback label used when product text is missing.
 * @returns The best available product display name.
 */
export function resolveProductName(product: Product, fallbackName: string) {
  return product.name ?? product.sku ?? product.slug ?? product.id ?? fallbackName;
}

/**
 * @description Resolves the canonical href for a product detail page.
 * @param product The product to link.
 * @returns The product href or the products listing fallback.
 */
export function resolveProductHref(product: Product) {
  return product.slug ? `/products/${product.slug}` : '/products';
}

/**
 * @description Resolves the display label for a category with safe fallbacks.
 * @param category The category to label.
 * @param fallbackPrefix The fallback prefix used when category text is missing.
 * @param index The category index for fallback numbering.
 * @returns The best available category label.
 */
export function resolveCategoryLabel(category: Category, fallbackPrefix: string, index: number) {
  return category.name ?? category.slug ?? category.id ?? `${fallbackPrefix} ${index + 1}`;
}

/**
 * @description Resolves the canonical href for a category, including custom overrides.
 * @param category The category to link.
 * @returns The category href or the products listing fallback.
 */
export function resolveCategoryHref(category: Category) {
  if (category.href) {
    return category.href;
  }

  return category.slug ? `/categories/${category.slug}` : '/products';
}
