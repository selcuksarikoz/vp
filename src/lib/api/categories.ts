import { categoryCollectionSchema } from '@/lib/schemas/commerce';
import type { Category } from '@/types/commerce';

import { buildResourcePath, readParsed } from './shared';

/**
 * @description Fetches all categories from the mocked API.
 * @returns The category collection.
 */
export async function getCategories(): Promise<Category[]> {
  return readParsed('/categories', {
    fallback: [],
    schema: categoryCollectionSchema,
    tags: ['categories'],
  });
}

/**
 * @description Fetches a category by slug.
 * @param slug The category slug.
 * @returns The matched category or `null`.
 */
export async function getCategoryBySlug(slug: string | null): Promise<Category | null> {
  if (!slug) {
    return null;
  }

  const categories = await readParsed(buildResourcePath('/categories', { slug }), {
    fallback: [],
    schema: categoryCollectionSchema,
    tags: ['categories'],
  });

  return categories[0] ?? null;
}

/**
 * @description Resolves a category slug into the root id plus all descendant ids used for filtering.
 * @param slug The root category slug.
 * @returns The category ids used for catalog filtering.
 */
export async function getCategoryFilterIds(slug: string | null): Promise<string[]> {
  if (!slug) {
    return [];
  }

  const categories = await getCategories();
  const rootCategory = categories.find((category) => category.slug === slug);
  const rootCategoryId = rootCategory?.id;

  if (!rootCategoryId) {
    return [];
  }

  const descendantIds = new Set<string>([rootCategoryId]);
  const queue = [rootCategoryId];

  while (queue.length) {
    const currentId = queue.shift();

    if (!currentId) {
      continue;
    }

    categories.forEach((category) => {
      if (!category.id) {
        return;
      }

      if (category.parentId !== currentId || descendantIds.has(category.id)) {
        return;
      }

      descendantIds.add(category.id);
      queue.push(category.id);
    });
  }

  return [...descendantIds];
}
