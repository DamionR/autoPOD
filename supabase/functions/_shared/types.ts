// types.ts - Shared types/interfaces for Edge Functions

export interface GelatoTemplate {
  id: string;
  templateName: string;
  title: string;
  description: string;
  previewUrl: string;
  productType?: string;
  vendor?: string;
  variants: TemplateVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface GelatoVariant {
  id: string;
  name: string;
  attributes: Record<string, string>;
}

export interface GelatoPlaceholder {
  name: string;
  type: string;
  required: boolean;
}

export interface GelatoProduct {
  id: string;
  templateId: string;
  title: string;
  description: string;
  variants: GelatoVariant[];
  status: string;
}

export interface ImagePlaceholder {
  name: string;
  printArea: string;
  height: number;
  width: number;
}

export interface VariantOption {
  name: string;
  value: string;
}

export interface TemplateVariant {
  id: string;
  title: string;
  productUid: string;
  variantOptions: VariantOption[];
  imagePlaceholders: ImagePlaceholder[];
}

export interface CreateProductPayload {
  templateId: string;
  title: string;
  description: string;
  isVisibleInTheOnlineStore?: boolean;
  salesChannels?: string[];
  tags?: string[];
  variants?: {
    templateVariantId: string;
    position?: number;
    imagePlaceholders?: {
      name: string;
      fileUrl: string;
      fitMethod?: string;
    }[];
  }[];
  productType?: string;
  vendor?: string;
}

export interface GelatoProductResponse {
  id: string;
  storeId: string;
  externalId?: string;
  title: string;
  description: string;
  previewUrl: string;
  status: string;
  tags?: string[];
  productType?: string;
  vendor?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Gelato Webhook Event Types ---

// Order Status Updated
export interface GelatoOrderStatusUpdated {
  id: string;
  event: "order_status_updated";
  orderId: string;
  storeId: string | null;
  orderReferenceId: string;
  fulfillmentStatus: string;
  items: GelatoOrderItem[];
}
export interface GelatoOrderItem {
  itemReferenceId: string;
  fulfillmentStatus: string;
  fulfillments: GelatoOrderItemFulfillment[];
}
export interface GelatoOrderItemFulfillment {
  trackingCode: string;
  trackingUrl: string;
  shipmentMethodName: string;
  shipmentMethodUid: string;
  fulfillmentCountry: string;
  fulfillmentStateProvince: string;
  fulfillmentFacilityId: string;
}

// Order Item Status Updated
export interface GelatoOrderItemStatusUpdated {
  id: string;
  event: "order_item_status_updated";
  orderId: string;
  storeId: string | null;
  itemReferenceId: string;
  orderReferenceId: string;
  status: string;
  fulfillmentCountry: string;
  fulfillmentStateProvince: string;
  fulfillmentFacilityId: string;
  comment: string;
  created: string;
}

// Order Item Tracking Code Updated
export interface GelatoOrderItemTrackingCodeUpdated {
  id: string;
  event: "order_item_tracking_code_updated";
  orderId: string;
  storeId: string | null;
  itemReferenceId: string;
  orderReferenceId: string;
  trackingCode: string;
  trackingUrl: string;
  shipmentMethodName: string;
  shipmentMethodUid: string;
  productionCountry: string;
  productionStateProvince: string;
  productionFacilityId: string;
  created: string;
}

// Order Delivery Estimate Updated
export interface GelatoOrderDeliveryEstimateUpdated {
  id: string;
  event: "order_delivery_estimate_updated";
  orderId: string;
  storeId: string | null;
  orderReferenceId: string;
  minDeliveryDate: string;
  maxDeliveryDate: string;
  created: string;
}

// Catalog Product Stock Availability Updated
export interface GelatoCatalogProductStockAvailabilityUpdated {
  id: string;
  event: "catalog_product_stock_availability_updated";
  productAvailability: GelatoProductAvailability[];
}
export interface GelatoProductAvailability {
  productUid: string;
  availability: GelatoStockAvailability[];
}
export interface GelatoStockAvailability {
  stockRegionUid: string;
  status: "in-stock" | "out-of-stock-replenishable" | "out-of-stock";
}

// Store Product Created/Updated/Deleted
export interface GelatoStoreProductCreated {
  id: string;
  event: "store_product_created";
  storeProductId: string;
  storeId: string;
  externalId?: string;
  title: string;
  description: string;
  previewUrl: string;
  externalPreviewUrl?: string;
  externalThumbnailUrl?: string;
  publishingErrorCode?: string | null;
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  variants: GelatoStoreProductVariant[];
  productVariantOptions: GelatoProductVariantOption[];
}
export interface GelatoStoreProductVariant {
  id: string;
  title: string;
  externalId: string;
  connectionStatus: string;
}
export interface GelatoProductVariantOption {
  name: string;
  values: string[];
}
export interface GelatoStoreProductUpdated {
  id: string;
  event: "store_product_updated";
  storeProductId: string;
  storeId: string;
  externalId?: string;
  title: string;
  description: string;
  previewUrl: string;
  externalPreviewUrl?: string;
  externalThumbnailUrl?: string;
  publishingErrorCode?: string | null;
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  variants: GelatoStoreProductVariant[];
  productVariantOptions: GelatoProductVariantOption[];
}
export interface GelatoStoreProductDeleted {
  id: string;
  event: "store_product_deleted";
  storeProductId: string;
}

// Store Product Template Created/Updated/Deleted
export interface GelatoStoreProductTemplateCreated {
  id: string;
  event: "store_product_template_created";
  storeProductTemplateId: string;
  title: string;
  description: string;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
  variants: GelatoStoreProductTemplateVariant[];
}
export interface GelatoStoreProductTemplateVariant {
  id: string;
  title: string;
  productUid: string;
  variantOptions: VariantOption[];
  imagePlaceholders: ImagePlaceholder[];
  textPlaceholders?: { name: string; text: string }[];
}
export interface GelatoStoreProductTemplateUpdated {
  id: string;
  event: "store_product_template_updated";
  storeProductTemplateId: string;
  title: string;
  description: string;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
  variants: GelatoStoreProductTemplateVariant[];
}
export interface GelatoStoreProductTemplateDeleted {
  id: string;
  event: "store_product_template_deleted";
  storeProductTemplateId: string;
}

// Union type for all webhook events
export type GelatoWebhookEvent =
  | GelatoOrderStatusUpdated
  | GelatoOrderItemStatusUpdated
  | GelatoOrderItemTrackingCodeUpdated
  | GelatoOrderDeliveryEstimateUpdated
  | GelatoCatalogProductStockAvailabilityUpdated
  | GelatoStoreProductCreated
  | GelatoStoreProductUpdated
  | GelatoStoreProductDeleted
  | GelatoStoreProductTemplateCreated
  | GelatoStoreProductTemplateUpdated
  | GelatoStoreProductTemplateDeleted;
