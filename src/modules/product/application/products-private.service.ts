import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGcInDto } from './dto/create-gc-in.dto';
import { StockGc } from '../domain/entities/stock-gc.entity';


@Injectable()
export class ProductsPrivateService {
  constructor(
    private readonly stockGcRepository: Repository<StockGc>,
  ) { }

  async addProduct(createGcInDto: CreateGcInDto): Promise<void> {
    const {
      clave,
      cuenta,
      ean13,
      id_producto,
      tipo_gc
    } = createGcInDto

    const stock = this.stockGcRepository.create({
      clave,
      cuenta,
      ean13,
      fecha_carga: new Date(),
      id_producto,
      tipo_gc,

    })
    this.stockGcRepository.save(stock)
    return
  }
}
