import { Module } from '@nestjs/common';
import { ProductsService } from '../application/products.service';
import { ProductsController } from './products.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiGuard } from '../../shared/application/api-key.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockGc } from '../domain/entities/stock-gc.entity';
import { StockService } from '../application/stock.service';
import { Product } from '../domain/entities/produc.entity';
import { ProductDetail } from '../domain/entities/product-detail.entity';



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
  providers: [ProductsService, StockService],
  controllers: [ProductsController],
})
export class ProductsModule { }
