import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity({ name: 'producto_detalle' })
export class ProductDetail {

  @PrimaryColumn()
  id: number;
  @Column({ nullable: true })
  nombre?: string;
  @Column({ nullable: true })
  precio?: number;
  @Column({ nullable: true })
  idcategoria?: number;
  @Column({ nullable: true })
  categoria?: string;
  @Column({ nullable: true })
  sub_categoria?: string;
  @Column({ nullable: true })
  stock?: number;
  @Column({ nullable: true })
  proveedor?: string;
  @Column({ type: "text" })
  descripcion: string;
  @Column({ nullable: true })
  marca?: string;
  @Column({ nullable: true })
  thumbnail?: string;
  @Column({ nullable: true })
  pesoNormal?: number;
  @Column({ nullable: true })
  pesoMayor?: number;
  @Column({ nullable: true })
  peso_volumetrico?: number;
  @Column({ nullable: true })
  largo?: number;
  @Column({ nullable: true })
  alto?: number;
  @Column({ nullable: true })
  ancho?: number;
  @Column({ nullable: true })
  modelo?: string;
  @Column({ nullable: true })
  genero?: string;

  logo?: string;
  img?: string[];

}
