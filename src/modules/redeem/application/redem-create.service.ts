import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Redeem } from '../domain/redeem.entity';
import { CreateRedeemDto } from './dto/create-redeem.dto';
import { StockService } from '../../product/application/stock.service';
import { ProductService } from '../../product/application/products.service';
import { UrlBaseService } from '../../shared/application/url-base.service';
import { EStatus, RedeemDto, RedeemResponse } from '../domain/dto/redeem-in.dto';
import { v4 as uuid } from 'uuid';
import { GcEnum } from '../../product/domain/entities/stock-gc.entity';
import { RedeemService } from './redeem.service';
@Injectable()
export class RedeemCreateService {
  constructor(
    @InjectRepository(Redeem, "postgresConnection")
    private readonly redeemRepository: Repository<Redeem>,
    private readonly stockService: StockService,
    private readonly productService: ProductService,
    private readonly urlBaseService: UrlBaseService,
    private readonly redeemService: RedeemService
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


  // TODO simplificar el redeem, single responsability! de momento es un canje a gc pero debe convulsionar 
  // para cualquier tipo de producto
  async doRedeem(redeemDto: RedeemDto): Promise<RedeemResponse> {
    const { CanjeDetalle, ProductoDetalle } = redeemDto;
    const { rutCliente, correo, nombreCliente } = CanjeDetalle;
    const { idProducto } = ProductoDetalle
    const uuidCode = uuid()
    let url_cupon
    let n_tarjeta
    let clave

    const gcStock = await this.stockService.knowFreeGcByOne(idProducto)

    if (!gcStock) {
      return this.redeemResponse(EStatus.ERROR, null, `El producto con ID ${idProducto} no está en stock.`)
    }

    if (gcStock.tipo_gc === GcEnum.CENCOSUD) { // si es cenco lo obtengo de stockgc
      url_cupon = gcStock.url_cupon
      n_tarjeta = gcStock.cuenta
      clave = gcStock.clave
    } else if (gcStock.tipo_gc === GcEnum.FALABELLA) { // si es falabella se construye y se inserta en canje
      url_cupon = this.urlBaseService.urlFalabellaByUuid(uuidCode)
      n_tarjeta = gcStock.falabella_sodimac
      clave = gcStock.cod_seguridad
    }

    const product = await this.productService.getProductById(idProducto)

    // TODO implementar redeem create
    //this.redeemCreate.do():
    const redeem = await this.redeemRepository.create({
      correo,
      uuid: uuidCode,
      rut_cliente: rutCliente,
      nombre_cliente: nombreCliente,
      createdAt: new Date,
      datos_productos: {
        id_producto: idProducto,
        nombre_producto: product.nombre,
        clave: clave,
        n_tarjeta: n_tarjeta,
        tipo_gc: gcStock.tipo_gc,
        url_cupon: url_cupon,
        monto: gcStock.monto,
        gc_tottus: gcStock.gc_tottus,
        falabella_sodimac: gcStock.falabella_sodimac,
        fecha_vencimiento: gcStock.fecha_vencimiento,
        cod_seguridad: gcStock.cod_seguridad
      }
    })

    const redeemStored = await this.redeemRepository.save(redeem)

    const storedRedeem = await this.redeemService.getRedeem(redeemStored.id)
    await this.stockService.assignRutGcByRut(gcStock.id, rutCliente)
    await this.productService.discountStockProductByOne(idProducto)
    // aplicar descuento de stock
    return this.redeemResponse(EStatus.SUCCESS, storedRedeem, null)

  }

  redeemResponse(statusError: EStatus, storedRedeem: Redeem, message: string,): RedeemResponse {
    const response: RedeemResponse = {
      status: statusError,
      ...(storedRedeem ? { datos_canje: storedRedeem } : {}),
      ...(message ? { message: message } : {}),
    }
    return response
  }

}