import { Injectable, NotFoundException } from '@nestjs/common';
import { EStatus, RedeemDto, RedeemResponse, codeGc } from '../domain/dto/redeem-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Redeem } from '../domain/redeem.entity';
import { Repository } from 'typeorm';
import { StockService } from '../../product/application/stock.service';
import { Product } from '../../product/domain/entities/produc.entity';
import { RedeemCreate } from './redem-create';




@Injectable()
export class RedeemService {

  constructor(
    @InjectRepository(Redeem, "postgresConnection")
    private readonly redeemRepository: Repository<Redeem>,
    @InjectRepository(Product, "postgresConnection")
    private readonly productViewRepository: Repository<Product>,
    private readonly stockService: StockService,
    private readonly redeemCreate: RedeemCreate
  ) { }


  // TODO simplificar el redeem, single responsability!
  async doRedeem(redeemDto: RedeemDto): Promise<RedeemResponse> {
    const { CanjeDetalle, ProductoDetalle } = redeemDto;
    const { rutCliente, correo, nombreCliente } = CanjeDetalle;
    const { idProducto } = ProductoDetalle

    const gcStock = await this.stockService.knowFreeGcByOne(idProducto)

    // saber si hay stock en postgres
    if (!gcStock) {
      return this.redeemResponse(EStatus.ERROR,  null , `El producto con ID ${idProducto} no está en stock.`)
    }

    const product = await this.productViewRepository.findOneBy({
      id: idProducto
    })
    
    // TODO implementar redeem create
    //this.redeemCreate.do():

    const redeem = await this.redeemRepository.create({
      correo,
      rut_cliente: rutCliente,
      nombre_cliente: nombreCliente,
      createdAt: new Date,
      datos_productos: {
        id_producto: idProducto,
        nombre_producto: product.nombre,
        clave: gcStock.clave,
        ean13: gcStock.ean13, 
        cuenta: gcStock.cuenta,
        tipo_gc: gcStock.tipo_gc,
        url: gcStock.url_cupon
      }
    })

    const redeemStored = await this.redeemRepository.save(redeem)

    const code: codeGc = {
      id: redeemStored.id,
      clave: gcStock.clave,
      code: gcStock.ean13,
      n_tarjeta: gcStock.cuenta,
      id_producto: idProducto,
      url_cupon: gcStock.url_cupon
    }
    this.stockService.assignRutGcByOne(gcStock.id, rutCliente)

    return this.redeemResponse(EStatus.SUCCESS, code, null)

  }

  async getRedeem(id: number): Promise<any> {
    const stored = await this.redeemRepository.findOneBy({
      id: id
    })

    if (!stored) {
      throw new NotFoundException(`no existe canje con id  ${id}`);
    }

    return stored;
  }

  redeemResponse(statusError: EStatus,  code: codeGc , messagge: string,): RedeemResponse {

    const response: RedeemResponse = {
      status: statusError,
      ...(code ? { code: code } : {}),
      ...(messagge ? { messagge: messagge } : {}),
    }
    return response

  }

}