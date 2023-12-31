import { Controller, Post , Body} from '@nestjs/common';
import { CreateGcInDto } from '../application/dto/create-gc-in.dto';
import { ProductsPrivateService } from '../application/products-private.service';

// TODO: cambiar api key para endpoint privados
@Controller('private-product')
export class PrivateProductController {
  constructor(
    private readonly productsPrivateService: ProductsPrivateService,
  ) { }
  
  // inserta stock GC
  @Post("add-stock")
  async addProducts(@Body() createGcInDto: CreateGcInDto[]): Promise<any> {
    //console.log(createGcInDto)
    return this.productsPrivateService.addProduct(createGcInDto)
  }

}