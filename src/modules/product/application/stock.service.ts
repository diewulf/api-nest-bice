import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { StockGc } from '../domain/entities/stock-gc.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockGc, "postgresConnection")
    private readonly stockGcRepository: Repository<StockGc>,
  ) { }

  
  async knowFreeGcByOne(idProducto: number): Promise<StockGc> {

    const stock = await this.stockGcRepository.findOne({
      where: { id_producto: idProducto, rut_cliente: IsNull() },
      order: {
        id: 1
      }
    })
    return stock
  }

  async assignRutGcByOne(idGcProduct: number, rutClient: string): Promise<StockGc> {

    const stock = await this.stockGcRepository.findOneBy({
      id: idGcProduct
    })

    stock.rut_cliente = rutClient
    stock.fecha_canje = new Date

    return await this.stockGcRepository.save(stock);

  }



}