import { Product } from '../entities/product.entity';

export class ProductResponse {
  products?: Product[];
  page?: number;
  pageSize?: number;
  maxPage?: number;
}