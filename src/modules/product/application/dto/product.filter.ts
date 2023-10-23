import { IsInt, Min, Max, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterDto } from '../../../shared/domain/base-filter.dto';
import { Type } from 'class-transformer';

export enum EOrderProductBy {
  POSITION = "POSITION",
  LOWPRICES = "LOWPRICES",
  HIGHPRICES = "HIGHPRICES"
}
export class ProductFilterDto extends BaseFilterDto {

  @IsNotEmpty()
  @ApiProperty({ description: 'Id de la categoría' })
  @Type(() => Number)
  idCategory?: number;

  @ApiProperty({ description: 'Id de la sub-categoría', required: false })
  @IsOptional()
  @Type(() => Number)
  subCategory?: number = null;

  @ApiProperty({
    description: 'ordenar por: posicion, precio mas bajo, precio mas alto',
    enum: EOrderProductBy,
    default: EOrderProductBy.POSITION
  })
  @IsOptional()
  @Type(() => String)
  @IsEnum(EOrderProductBy)
  orderBy: EOrderProductBy = EOrderProductBy.POSITION


}
