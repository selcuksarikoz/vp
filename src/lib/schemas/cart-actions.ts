import { z } from 'zod';

/**
 * @description Reads common cart action fields from submitted form data.
 * @param formData The submitted form payload.
 * @returns The raw cart action object before schema validation.
 */
function readCartActionFormData(formData: FormData) {
  return {
    currentPath: formData.get('currentPath') || undefined,
    productId: formData.get('productId'),
    variantId: formData.get('variantId') || undefined,
    quantity: formData.get('quantity'),
  };
}

/**
 * @description Validates a cart action form payload with the provided schema.
 * @param schema The schema used for validation.
 * @param formData The submitted form payload.
 * @returns The schema parse result.
 */
function parseCartActionFormData<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  formData: FormData,
) {
  return schema.safeParse(readCartActionFormData(formData));
}

export const addToCartSchema = z.object({
  currentPath: z.string().startsWith('/').optional(),
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.coerce.number().int().min(1).max(99),
});

export const updateCartLineSchema = z.object({
  currentPath: z.string().startsWith('/').optional(),
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.coerce.number().int().min(0).max(99),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartLineInput = z.infer<typeof updateCartLineSchema>;

/**
 * @description Validates add-to-cart form data.
 * @param formData The submitted form payload.
 * @returns The parsed add-to-cart payload.
 */
export function parseAddToCartFormData(formData: FormData) {
  return parseCartActionFormData(addToCartSchema, formData);
}

/**
 * @description Validates cart line update form data.
 * @param formData The submitted form payload.
 * @returns The parsed cart line update payload.
 */
export function parseUpdateCartLineFormData(formData: FormData) {
  return parseCartActionFormData(updateCartLineSchema, formData);
}
