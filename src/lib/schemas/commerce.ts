import { z } from 'zod';

export const imageSchema = z
  .object({
    url: z.string().optional(),
    alt: z.string().optional(),
  })
  .passthrough();

export const attributeSchema = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .passthrough();

export const dimensionsSchema = z
  .object({
    width: z.string().optional(),
    height: z.string().optional(),
    depth: z.string().optional(),
  })
  .partial();

export const variantSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    capacity: z.string().optional(),
    dimensions: dimensionsSchema.optional(),
  })
  .passthrough();

export const ratingSchema = z
  .object({
    id: z.string().optional(),
    productId: z.string().optional(),
    average: z.number().min(0).max(5).optional(),
    count: z.number().int().min(0).optional(),
    value: z.number().int().min(1).max(5).optional(),
  })
  .passthrough();

export const moneySchema = z
  .object({
    gross: z.number().nullable().optional(),
    currency: z.string().optional(),
    note: z.string().nullable().optional(),
  })
  .partial()
  .nullable();

export const productStockSchema = z
  .object({
    isInStock: z.boolean().optional(),
    note: z.string().nullable().optional(),
  })
  .partial()
  .nullable();

export const productSeoSchema = z
  .object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  })
  .partial()
  .nullable();

export const productSchema = z
  .object({
    id: z.string().optional(),
    sku: z.string().nullable().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    brand: z.string().nullable().optional(),
    categoryIds: z.array(z.string()).optional(),
    price: moneySchema.optional(),
    attributes: z.array(attributeSchema).optional(),
    stock: productStockSchema.optional(),
    images: z.array(imageSchema).optional(),
    seo: productSeoSchema.optional(),
    variants: z.array(variantSchema).optional(),
  })
  .passthrough();

export const categorySchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    href: z.string().nullable().optional(),
    parentId: z.string().nullable().optional(),
  })
  .passthrough();

export const cartItemSchema = z
  .object({
    productId: z.string().optional(),
    variantId: z.string().nullable().optional(),
    quantity: z.number().optional(),
  })
  .passthrough();

export const cartSchema = z
  .object({
    id: z.string().optional(),
    items: z.array(cartItemSchema).optional(),
    currency: z.string().optional(),
    updatedAt: z.string().nullable().optional(),
  })
  .passthrough();

export const productCollectionSchema = z.array(productSchema);
export const categoryCollectionSchema = z.array(categorySchema);
export const ratingCollectionSchema = z.array(ratingSchema);

export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Cart = z.infer<typeof cartSchema>;
export type ProductRating = z.infer<typeof ratingSchema>;
export type ProductImage = z.infer<typeof imageSchema>;
export type ProductAttribute = z.infer<typeof attributeSchema>;
export type ProductVariant = z.infer<typeof variantSchema>;
export type ProductDimensions = z.infer<typeof dimensionsSchema>;
export type Money = NonNullable<z.infer<typeof moneySchema>>;
export type ProductStock = NonNullable<z.infer<typeof productStockSchema>>;
export type ProductSeo = NonNullable<z.infer<typeof productSeoSchema>>;
export type CartItem = z.infer<typeof cartItemSchema>;
