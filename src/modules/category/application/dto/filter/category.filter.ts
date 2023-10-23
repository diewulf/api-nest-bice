import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, Min, Max, IsNotEmpty } from 'class-validator';


export class SubCategoryFilterDto {
  /*   @IsNotEmpty()
    @IsInt()
    @Min(1) */
  
    @ApiProperty({ description: 'Id de la Sub categoria' })
    idCat?: number;
    @ApiProperty({ description: 'Id de la Sub categoria' })
    idSubCat?: number;
  
  /*   @IsInt()
    @Min(1)
    @Max(5)
    @IsNotEmpty() */
    @ApiProperty({ description: 'nombre de la categoria' })
    categoria?: string;
    @ApiProperty({ description: 'nombre de la sub categoria' })
    subCategoria?: string;
  
  }


export class CategoryFilterDto {
/*   @IsNotEmpty()
  @IsInt()
  @Min(1) */

  @ApiProperty({ description: 'Id de la categoria' })
  idCat?: number;


}