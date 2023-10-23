import { Controller, Get, Body, Put, Param, Query } from '@nestjs/common';
import { ProductService } from '../application/products.service';
import { StockProductsType } from '../application/dto/stock.out';
import { RebajaStockDto } from '../application/dto/rebaja-stock.dto';
import { ApiOperation} from '@nestjs/swagger';
import { ProductFilterDto } from '../application/dto/product.filter';
import { ProductResponse } from '../domain/dto/viewproduct.dto';
import { CustomController } from '../../shared/infrastructure/custom.decorator';
import { ProductDetail } from '../domain/entities/product-detail.entity';


@CustomController({ tags: ['productos'], security: true, useAuthGuard: true })
@Controller('productos')

export class ProductsController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  // Gets
  @ApiOperation({ summary: 'Obtener todos los productos con paginación, por categoria o destacados' })
  @Get() 
  getProducts(@Query() productFilterDto: ProductFilterDto): Promise<ProductResponse> {
    return this.productService.getProducts(productFilterDto)
  }



  @ApiOperation({ summary: 'Obtener el detalle de un producto por su id' })
  @Get("producto-detalle/:idProduct")
  getProductsDetail(@Param('idProduct') idProduct: number): Promise<ProductDetail> {
    return this.productService.getProductsDetail(idProduct)
  }

  @Get("stock-producto/:idProduct")
  @ApiOperation({ summary: 'Obtener el stock de un producto por su id' })
  getProductsStock(@Param('idProduct') idProduct: number): Promise<any> {
    return this.productService.getProductsStock(idProduct)
  }

  // Put
  @Put("rebaja-producto")
  @ApiOperation({ summary: 'Rebaja el stock de un producto por su id' })
  setProductsStock(@Body() rebajaStockDto: RebajaStockDto): StockProductsType {
    return this.productService.setProductsStock(rebajaStockDto)
  }


}
