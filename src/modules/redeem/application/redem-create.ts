import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Redeem } from '../domain/redeem.entity';
import { CreateRedeemDto } from './dto/create-redeem.dto';

@Injectable()
export class RedeemCreate {
  constructor(
    @InjectRepository(Redeem, "postgresConnection")
    private readonly redeemRepository: Repository<Redeem>,
  ) { }

  async do(createRedeemDto: CreateRedeemDto): Promise<Redeem> {

    const redeem = await this.redeemRepository.create({
      correo: createRedeemDto.correo,
      rut_cliente: createRedeemDto.rutCliente,
      nombre_cliente: createRedeemDto.nombreCliente,
      createdAt: new Date,
      datos_productos: createRedeemDto.datosProductos
    })

    const redeemStored = await this.redeemRepository.save(redeem)
    return redeemStored
  } 

}