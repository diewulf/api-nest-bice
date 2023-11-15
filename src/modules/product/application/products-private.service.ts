import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGcInDto } from './dto/create-gc-in.dto';
import { GcEnum, StockGc } from '../domain/entities/stock-gc.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductsPrivateService {
  constructor(
    @InjectRepository(StockGc, "postgresConnection")
    private readonly stockGcRepository: Repository<StockGc>,
  ) { }

  async addProduct(createGcInDto: CreateGcInDto[]): Promise<void> {
    // use createGcInDto in a foreach to insert into this.stockGcRepository with same values

    // poner un await a createGcInDto
    await Promise.all(createGcInDto.map(async (dto) => {

      // if exist stock from createGcInDto
      if (dto.tipo_gc == GcEnum.CENCOSUD) {
        const existStock = await this.stockGcRepository.findOneBy({
          cuenta: dto.cuenta,
        })
        if (existStock) {
          console.log("existe CENCOSUD este compadre");
        } else {
          const stock = await this.stockGcRepository.create(dto);
          this.stockGcRepository.save(stock);
        }
      }

      if (dto.tipo_gc == GcEnum.FALABELLA) {
        const existStock = await this.stockGcRepository.findOneBy({
          gc_tottus: dto.gc_tottus,
        })
        if (existStock) {
          console.log("🚀 ~ file: products-private.service.ts:38 ~ ProductsPrivateService ~ addProduct ~ existStock:", existStock)
          console.log("existe FALLABELLA este compadre");

        } else {
          const stock = await this.stockGcRepository.create(dto);
          this.stockGcRepository.save(stock);
        }
      }

    }));


    return
  }
}
