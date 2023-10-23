import { ViewColumn, ViewEntity } from 'typeorm';


@ViewEntity({
  expression: `
    SELECT
    id,
    nombre,
    nombreDetalle,
    marca,
    precio,
    proveedor,
    stock,
    posicion,
    idCategoria,
    categoria,
    thumbnail
    FROM
    BW_productos
    `,
  database: 'servic25_mc',
  name:"BW_productos"
})
export class ViewProduct {

  @ViewColumn()
  id: number;
  @ViewColumn()
  nombre: string;
  @ViewColumn()
  nombreDetalle: string;
  @ViewColumn()
  precio: number;
  @ViewColumn()
  idCategoria: number;
  @ViewColumn()
  categoria: string;
  //subCategoria: string;
  @ViewColumn()
  stock: number;
  @ViewColumn()
  proveedor: string;
  @ViewColumn()
  marca: string;
  //thumbnail: string;
  @ViewColumn()
  posicion: number;

  @ViewColumn()
  thumbnail: string;

  url: string;

}