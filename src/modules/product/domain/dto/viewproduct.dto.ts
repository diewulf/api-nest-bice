import { Product } from '../entities/produc.entity';

export class ProductResponse {
  products?: Product[];
  page?: number;
  pageSize?: number;
  maxPage?: number;
}