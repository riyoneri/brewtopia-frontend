/* eslint-disable no-unused-vars */

interface SimpleProductDto {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  previousPrice?: number;
  hasDiscountInApp?: boolean;
  description: string;
  quantity: number;
  category: string;
}

interface ProductDto {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  previousPrice?: number;
  hasDiscountInApp?: boolean;
  description: string;
  quantity: number;
  category: Omit<CategoryDto, "createdAt">;
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

interface ResponseError {
  message: string;
  statusCode: number;
}

interface ExtendedResponseError<T> extends ResponseError {
  validationErrors: Partial<Record<keyof T, string>>;
}

interface ResponseData {
  message: string;
}

interface AdminDto {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  notifications: Array<NotificationDto>;
}

interface UserDto {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  active: boolean;
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
  defaultKey?: string;
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
