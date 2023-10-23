import { Controller, Post } from '@nestjs/common';
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

  @Post('reset-stock')
  resetStock(): Promise<any> {
    return this.productsTransferService.resetStock()
  }


}
