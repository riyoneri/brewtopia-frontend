/* eslint-disable no-unused-vars */
interface ProductDto {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  previousPrice?: number;
  hasDiscountInApp?: boolean;
  description: string;
}

interface WorkspaceDto {
  id: string;
  name: string;
  imageUrl: string;
}
