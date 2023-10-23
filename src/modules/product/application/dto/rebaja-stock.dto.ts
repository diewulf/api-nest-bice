import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class RebajaStockDto {


  @ApiProperty({ description: 'Id del producto' })
  idProducto?: number;
  @ApiProperty({ description: 'cantidad a descontar del stock' })
  montoDescontar?: number;
}