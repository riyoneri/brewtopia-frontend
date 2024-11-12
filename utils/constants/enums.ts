/* eslint-disable no-unused-vars */

export enum ORDER_STATUS {
  PROCESSED = "Processed",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export enum FETCH_METHOD {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum QUERY_KEYS {
  ALL_PRODUCTS = "products",
  SINGLE_PRODUCT = "product",
  ALL_CATEGORIES = "categories",
  SINGLE_CATEGORY = "category",
  ALL_CLIENTS = "clients",
}
