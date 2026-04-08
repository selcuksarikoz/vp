import { clsx } from 'clsx';

/**
 * @description Merges conditional class name values into one className string.
 * @param values The class name values to merge.
 * @returns The merged className string.
 */
export function cn(...values: Parameters<typeof clsx>) {
  return clsx(...values);
}
