import { Module } from '@nestjs/common';
import { ProductService } from '../application/products.service';
import { ProductsController } from './products.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiGuard } from '../../shared/application/api-key.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockGc } from '../domain/entities/stock-gc.entity';
import { StockService } from '../application/stock.service';
import { Product } from '../domain/entities/product.entity';
import { ProductDetail } from '../domain/entities/product-detail.entity';
import { PrivateProductController } from './products-private.controller';
import { ProductsPrivateService } from '../application/products-private.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([StockGc, Product, ProductDetail] , 'postgresConnection'),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRETIME') }
      })
    })

  ],
  providers: [ProductService, StockService, ProductsPrivateService],
  controllers: [ProductsController,PrivateProductController],
})
export class ProductsModule { }
