import { ApiProperty } from "@nestjs/swagger";
import { Redeem } from "../redeem.entity";

export class DataRedeem {
    @ApiProperty({ description: 'Datos del cliente' })
    rutCliente: string;
    @ApiProperty({ description: 'Datos del cliente' })
    nombreCliente: string;
    @ApiProperty({ description: 'Datos del cliente' })
    correo: string;
}

export class ProductsDetail {
    @ApiProperty({ description: 'id del producto' })
    idProducto: number;
}

export interface RedeemDto {
    CanjeDetalle: DataRedeem
    ProductoDetalle: ProductsDetail
}
// response
export interface RedeemResponse {
    status: EStatus;
    canje?: Redeem;
    message?: string;
}

export interface codeGc {
    id: number;
    id_producto: number;
    clave: string;
    n_tarjeta: string;
    url_cupon: string;
}


export enum EStatus {
    SUCCESS = "SUCCESS",
    NO_STOCK = "NO_STOCK",
    PRODUCT_NOT_EXIST = "PRODUCT_NOT_EXIST",
    ERROR = "ERROR"
}