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
  message: string;
  statusCode: number;
  validationErrors: Partial<Record<string, string>>;
}

interface GlobalResponseError<T> extends FetcherResponse {
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

interface CategoryDto {
  id: string;
  name: string;
  createdAt: string;
}

interface CartItemDto {
  id: string;
  quantity: number;
  totalPrice: number;
  product: ProductDto;
}

interface OrderDto {
  id: string;
  createdAt: string;
  paymentMethod: string;
  displayId: string;
  status: string;
  products: CartItemDto[];
  total: number;
}

interface SelectOption {
  key: string;
  text: string;
}

interface FilterSortInputProperties {
  title?: string;
  hasHeader?: boolean;
  hasHeaderButton?: boolean;
  resetInput?: () => void;
  selectOptions: SelectOption[];
  name: string;
  className?: string;
  error?: string;
}

interface DiscountDto {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface ItemToDelete {
  id: string;
  name: string;
}

interface UserDto {
  id: string;
  name: string;
  email: string;
}
