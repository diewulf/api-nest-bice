import { Module } from '@nestjs/common';
import { ProductsTransferService } from '../application/products-transfer.service';
import { ProductsTransferController } from './products-transfer.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewProduct } from '../domain/entities/product.viewentity';
import { ViewProductDetail } from '../domain/entities/product-detail.viewentity';
import { Product } from '../../product/domain/entities/product.entity';
import { ProductDetail } from '../../product/domain/entities/product-detail.entity';
import { StockGc } from '../../product/domain/entities/stock-gc.entity';


// este modulo es para correr en local, es para transferir todo de MC a bicewellness postgres

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewProduct, ViewProductDetail] , 'mysqlConnection'),
    TypeOrmModule.forFeature([Product, ProductDetail, StockGc] , 'postgresConnection'),
  ],
  providers: [ProductsTransferService],
  controllers: [ProductsTransferController],
})
export class ProductTransferMyModule { }
