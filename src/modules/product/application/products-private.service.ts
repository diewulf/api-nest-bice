import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGcInDto } from './dto/create-gc-in.dto';
import { StockGc } from '../domain/entities/stock-gc.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductsPrivateService {
  constructor(
    @InjectRepository(StockGc, "postgresConnection")
    private readonly stockGcRepository: Repository<StockGc>,
  ) { }

  async addProduct(createGcInDto: CreateGcInDto): Promise<void> {
    const {
      clave,
      cuenta,
      ean13,
      id_producto,
      tipo_gc,
      cod_seguridad,
      falabella_sodimac,
      fecha_vencimiento,
      gc_tottus,
      monto
    } = createGcInDto
      

    const stock = this.stockGcRepository.create({
      clave,
      cuenta,
      ean13,
      fecha_carga: new Date(),
      id_producto,
      tipo_gc,
      cod_seguridad,
      falabella_sodimac,
      fecha_vencimiento,
      gc_tottus,
      monto
    })
    this.stockGcRepository.save(stock)
    return
  }
}
