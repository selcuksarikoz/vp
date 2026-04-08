export type AnalyticsItem = {
  item_id: string | null;
  item_name: string | null;
  item_brand: string | null;
  item_category: string | null;
  item_variant: string | null;
  price: number | null;
  quantity: number;
  currency: string | null;
};

export type ViewItemEvent = {
  event: 'view_item';
  page_type: 'product';
  ecommerce: {
    currency: string | null;
    items: [AnalyticsItem];
  };
};

export type AddToCartEvent = {
  event: 'add_to_cart';
  page_type: 'product';
  ecommerce: {
    currency: string | null;
    value: number | null;
    items: [AnalyticsItem];
  };
};

export type DataLayerEvent = ViewItemEvent | AddToCartEvent;
