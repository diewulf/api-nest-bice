import { ViewColumn, ViewEntity } from 'typeorm';


@ViewEntity({
  expression: `
    SELECT
    *
    FROM
    BW_productos
    `,
  database: 'servic25_mc',
  name:"BW_producto_detalle"
})
export class ViewProductDetail {
  
  @ViewColumn()
  id: number;
  @ViewColumn()
  nombre: string;
  @ViewColumn()
  precio: number;
  @ViewColumn()
  idcategoria: number;
  @ViewColumn()
  nombre_categoria: string;
  @ViewColumn()
  sub_categoria: string;
  @ViewColumn()
  stock: number;
  @ViewColumn()
  proveedor: string;
  @ViewColumn()
  descripcion: string;
  @ViewColumn()
  marca: string;
  @ViewColumn()
  thumbnail: string;
  @ViewColumn()
  pesoNormal:number;
  @ViewColumn()
  pesoMayor:number;
  @ViewColumn()
  peso_volumetrico: number;
  @ViewColumn()
  largo: number;
  @ViewColumn()
  alto: number;
  @ViewColumn()
  ancho: number;
  @ViewColumn()
  modelo: string;
  @ViewColumn()
  genero: string;

  img?: string[];

}
