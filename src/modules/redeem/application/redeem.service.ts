import { Injectable, NotFoundException } from '@nestjs/common';
import { EStatus, RedeemDto, RedeemResponse, codeGc } from '../domain/dto/redeem-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Redeem } from '../domain/redeem.entity';
import { Repository } from 'typeorm';
import { StockService } from '../../product/application/stock.service';
import { Product } from '../../product/domain/entities/product.entity';
import { RedeemCreate } from './redem-create';
import { ProductService } from '../../product/application/products.service';




@Injectable()
export class RedeemService {

  constructor(
    @InjectRepository(Redeem, "postgresConnection")
    private readonly redeemRepository: Repository<Redeem>,
    @InjectRepository(Product, "postgresConnection")
    private readonly productRepository: Repository<Product>,
    private readonly stockService: StockService,
    private readonly productService: ProductService,
    private readonly redeemCreate: RedeemCreate
  ) { }


  // TODO simplificar el redeem, single responsability! de momento es un canje a gc pero debe convulsionar 
  // para cualquier tipo de producto
  async doRedeem(redeemDto: RedeemDto): Promise<RedeemResponse> {
    const { CanjeDetalle, ProductoDetalle } = redeemDto;
    const { rutCliente, correo, nombreCliente } = CanjeDetalle;
    const { idProducto } = ProductoDetalle

    const gcStock = await this.stockService.knowFreeGcByOne(idProducto)

    // saber si hay stock en postgres
    if (!gcStock) {
      return this.redeemResponse(EStatus.ERROR, null, `El producto con ID ${idProducto} no está en stock.`)
    }

    const product = await this.productRepository.findOneBy({
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
        n_tarjeta: gcStock.cuenta,
        tipo_gc: gcStock.tipo_gc,
        url_cupon: gcStock.url_cupon
      }
    })

    const redeemStored = await this.redeemRepository.save(redeem)

    const storedRedeem = await this.getRedeem(redeemStored.id)
    await this.stockService.assignRutGcByOne(gcStock.id, rutCliente)
    await this.productService.discountStockProductByOne(idProducto)
    // aplicar descuento de stock
    return this.redeemResponse(EStatus.SUCCESS, storedRedeem, null)

  }


  async getRedeem(id: number): Promise<Redeem> {
    const stored = await this.redeemRepository.findOneBy({
      id: id
    })
    if (!stored) {
      throw new NotFoundException(`no existe canje con id  ${id}`);
    }
    return stored;
  }

  redeemResponse(statusError: EStatus, storedRedeem: Redeem, messagge: string,): RedeemResponse {
    const response: RedeemResponse = {
      status: statusError,
      ...(storedRedeem ? { datos_canje: storedRedeem } : {}),
      ...(messagge ? { messagge: messagge } : {}),
    }
    return response
  }

}