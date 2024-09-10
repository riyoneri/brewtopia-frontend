/* eslint-disable no-unused-vars */

interface ProductDto {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  previousPrice?: number;
  hasDiscountInApp?: boolean;
  description: string;
  quantity: number;
}

interface WorkspaceDto {
  id: string;
  name: string;
  imageUrl: string;
}

interface EventDto {
  id: string;
  name: string;
  date: string;
  imageUrl: string;
}

interface NewsDto {
  id: string;
  imageUrl: string;
  date: string;
  title: string;
  description: string;
}

interface NotificationDto {
  id: string;
  message: string;
  link: string;
}

interface FetcherResponse {
  errorMessage: string;
  statusCode: number;
  validationErrors: Partial<Record<string, string>>;
  message: string;
}

interface GlobalResponseError<T> extends Omit<FetcherResponse, "message"> {
  validationErrors: Partial<Record<keyof T, string>>;
}

interface AdminDto {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  notifications: Array<NotificationDto>;
}

interface SimplifiedResponse {
  message: string;
}
