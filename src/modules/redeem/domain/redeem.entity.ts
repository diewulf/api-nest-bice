
import { GcEnum } from '../../product/domain/entities/stock-gc.entity';
import { Base } from '../../shared/domain/Base';
import { Entity, Column, Generated } from 'typeorm';

export interface ProductsDetail {
  id_producto: number;
  tipo_gc?: GcEnum;
  clave?: string;
  n_tarjeta?: string;
  url_cupon?: string;
  nombre_producto?: string;
  monto?: number;
  gc_tottus?: string;
  falabella_sodimac?: string;
  fecha_vencimiento?: Date;
  cod_seguridad?: string;
}


interface DispatchDetail {
  direccion: string;
  n_depto: number;
}


@Entity({ name: 'canje' })
export class Redeem extends Base {

  @Column({name : "rut_cliente"})
  rut_cliente: string;

  @Column()
  uuid: string;

  @Column()
  correo: string;

  @Column({ nullable: true })
  nombre_cliente?: string;

  @Column({ type: 'jsonb' })
  datos_productos: ProductsDetail;

  @Column({ type: 'jsonb', nullable: true })
  datos_despacho?: DispatchDetail
}


