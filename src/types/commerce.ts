import type { Money, Product, ProductVariant } from '@/lib/schemas/commerce';

export type {
  CartItem,
  Cart,
  Category,
  Money,
  Product,
  ProductAttribute,
  ProductImage,
  ProductRating,
  ProductSeo,
  ProductStock,
  ProductVariant,
} from '@/lib/schemas/commerce';

export type CartLine = {
  id: string;
  product: Product | null;
  quantity: number;
  variant: ProductVariant | null;
  unitPrice: Money | null;
  lineTotal: number | null;
};
