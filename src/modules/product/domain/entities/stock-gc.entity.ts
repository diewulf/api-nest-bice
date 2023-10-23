import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'stockgc' })
export class StockGc {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_producto: number;

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
  tipo_gc: EGc;

  @Column({ type: 'text', nullable: true })
  url_cupon?: string;
}


export enum EGc {
  CENCOSUD = "CENCOSUD",
  FALLABELLA = "FALLABELLA"
}