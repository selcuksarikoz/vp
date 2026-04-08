import type { ZodType } from 'zod';

import { COMMERCE_CONSTANTS } from '@/constants/commerce';
import { fetchJson } from '@/lib/api/client';

type QueryValue = string | null | undefined;

/**
 * @description Builds a resource path and appends only non-empty query parameters.
 * @param resource The base resource path.
 * @param query Optional query parameters.
 * @returns The final resource path with query string when needed.
 */
export function buildResourcePath(
  resource: string,
  query?: Record<string, QueryValue | QueryValue[]>,
) {
  const searchParams = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry) {
          searchParams.append(key, entry);
        }
      });

      return;
    }

    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${resource}?${queryString}` : resource;
}

/**
 * @description Validates a payload with a schema and falls back when parsing fails.
 * @param schema The schema used for validation.
 * @param payload The payload returned by the API.
 * @param fallback The safe fallback value.
 * @returns The parsed value or the fallback.
 */
export function parseOrFallback<T>(schema: ZodType<T>, payload: unknown, fallback: T): T {
  const parsed = schema.safeParse(payload);

  return parsed.success ? parsed.data : fallback;
}

/**
 * @description Fetches and validates a resource in one step.
 * @param path The resource path to request.
 * @param options The schema, cache tags, and fallback value.
 * @returns The parsed resource payload or the fallback.
 */
export async function readParsed<T>(
  path: string,
  options: {
    fallback: T;
    schema: ZodType<T>;
    tags: string[];
  },
): Promise<T> {
  const payload = await fetchJson(path, options.fallback, {
    next: {
      revalidate: COMMERCE_CONSTANTS.revalidate,
      tags: options.tags,
    },
  });

  return parseOrFallback(options.schema, payload, options.fallback);
}
