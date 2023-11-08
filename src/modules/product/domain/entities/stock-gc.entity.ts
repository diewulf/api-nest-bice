import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from '../../../shared/domain/Base';

@Entity({ name: 'stockgc' })
export class StockGc extends Base {



  @Column()
  id_producto: number;

  @Column({ name: 'gc_tottus', nullable: true })
  gc_tottus?: string;

  @Column({ name: 'falabella_sodimac', nullable: true })
  falabella_sodimac?: string;

  @Column({ name: 'fecha_vencimiento', type: 'date', nullable: true })
  fecha_vencimiento?: Date;

  @Column({ nullable: true })
  monto?: number;

  @Column({ nullable: true, name: "cod_seguridad" })
  cod_seguridad?: string;

  @Column({ nullable: true })
  cuenta?: string;

  @Column({ nullable: true })
  clave?: string;

  @Column({ nullable: true })
  ean13?: string;

  @Column({ nullable: true })
  fecha_carga?: Date;

  @Column({ nullable: true })
  fecha_canje?: Date;

  @Column({ type: 'text', nullable: true })
  oc?: string | null;

  @Column({ type: 'text', nullable: true })
  rut_cliente?: string;

  @Column()
  tipo_gc: GcEnum;

  @Column({ type: 'text', nullable: true })
  url_cupon?: string;

  tipo_beneficio: TipoBeneficioEnum;
}


export enum GcEnum {
  CENCOSUD = "CENCOSUD",
  FALABELLA = "FALABELLA"
}

export enum TipoBeneficioEnum {
  COPAGO = "COPAGO",
  EXCLUSIVO = "EXCLUSIVO",
  ADICIONALES = "ADICIONALES"
}