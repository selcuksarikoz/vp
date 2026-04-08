import { z } from 'zod';

export const rateProductSchema = z.object({
  productId: z.string().min(1),
  productSlug: z.string().min(1),
  value: z.coerce.number().int().min(1).max(5),
});

export type RateProductInput = z.infer<typeof rateProductSchema>;

/**
 * @description Validates submitted product rating form data.
 * @param formData The submitted form payload.
 * @returns The parsed product rating payload.
 */
export function parseRateProductFormData(formData: FormData) {
  return rateProductSchema.safeParse({
    productId: formData.get('productId'),
    productSlug: formData.get('productSlug'),
    value: formData.get('value'),
  });
}
