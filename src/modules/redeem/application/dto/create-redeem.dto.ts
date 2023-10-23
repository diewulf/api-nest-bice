import { ProductsDetail } from "../../domain/redeem.entity";


export class CreateRedeemDto{
    rutCliente: string;
    nombreCliente: string;
    correo: string;
    datosProductos: ProductsDetail;
}

