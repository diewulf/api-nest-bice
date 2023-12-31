import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity({ name: 'producto' })
export class Product {

  @PrimaryColumn()
  id: number;
  @Column({ nullable: true })
  nombre?: string;
  @Column({ type: "text"})
  descripcion: string;
  @Column({ nullable: true })
  precio?: number;
  @Column({ nullable: true })
  idcategoria?: number;
  @Column({ nullable: true })
  categoria?: string;
  @Column({ nullable: true })
  stock?: number;
  @Column({ nullable: true })
  proveedor?: string;
  @Column({ nullable: true })
  marca?: string;
  @Column({ nullable: true })
  posicion?: number;
  @Column({ nullable: true })
  thumbnail?: string;
  
  logo?: string;
  img: string[];

}