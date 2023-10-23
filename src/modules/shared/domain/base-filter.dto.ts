import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BaseFilterDto {
  @ApiProperty({ description: 'numero de la paginacion, obligatorio, positivo > 1' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: 'cantidad de registros a mostrar por paginacion min(1) max(10)' })
  pageSize: number;
}