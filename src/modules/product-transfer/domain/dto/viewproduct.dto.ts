import { ViewProduct } from '../entities/product.viewentity';

export class ProductResponse {
  products?: ViewProduct[];
  page?: number;
  pageSize?: number;
  maxPage?: number;
}