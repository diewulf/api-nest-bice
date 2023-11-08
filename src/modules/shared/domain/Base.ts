import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;

    @Column({ nullable: true })
    updatedAt?: Date;

    @Column({ nullable: true })
    createdBy?: string;

    //make column with rut

}