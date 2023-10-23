
import { EGc } from '../../product/domain/entities/stock-gc.entity';
import { Base } from '../../shared/domain/Base';
import { Entity, Column } from 'typeorm';


// en un futuro el pick no tendra sentido con otros productos pero lo dejo de momento
export interface ProductsDetail {
  id_producto: number;
  tipo_gc?: EGc;
  ean13?: string;
  clave?: string;
  cuenta?: string;
  url?: string;
  nombre_producto?: string;
}


interface DispatchDetail {
  direccion: string;
  n_depto: number;
}


@Entity({ name: 'canje' })
export class Redeem extends Base {

  @Column()
  rut_cliente: string;

  @Column()
  correo: string;

  @Column({ nullable: true })
  nombre_cliente?: string;

  @Column({ type: 'jsonb' })
  datos_productos: ProductsDetail;

  @Column({ type: 'jsonb', nullable: true })
  datos_despacho?: DispatchDetail
}
