import { Controller, Get, Body, UseGuards, Put, Param, Post, Query } from '@nestjs/common';
import { ProductDetailType } from '../application/dto/products.out';
import { StockProductsType } from '../application/dto/stock.out';
import { RebajaStockDto } from '../application/dto/rebaja-stock.dto';
import { ApiTags,ApiOperation, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';
import { ProductFilterDto } from '../application/dto/product.filter';
import { AuthJwtGuard } from '../../shared/application/auth-jwt.guard';
import { ProductResponse } from '../domain/dto/viewproduct.dto';
import { ViewProductDetail } from '../domain/entities/product-detail.viewentity';
import { CustomController } from '../../shared/infrastructure/custom.decorator';
import { ProductsTransferService } from '../application/products-transfer.service';


@Controller('productos-transfer')
export class ProductsTransferController {
  constructor(
    private readonly productsTransferService: ProductsTransferService,
  ) { }

  // Gets
  @Post('productos') 
  transferProduct(): Promise<any> {
    return this.productsTransferService.productSync()
  }

  @Post('productos-detalle') 
  transferProductDetail(): Promise<any> {
    return this.productsTransferService.productDetailSync()
  }


}
