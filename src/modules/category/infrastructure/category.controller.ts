import { Controller, Get, Body, UseGuards, Query } from '@nestjs/common';

import { CategoryService } from '../application/category.service';
import { CategoryType, SubCategoryType } from '../application/dto/category.out';
import { CategoryFilterDto, SubCategoryFilterDto } from '../application/dto/filter/category.filter';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { BaseFilterDto } from '../../shared/domain/base-filter.dto';
import { AuthJwtGuard } from '../../shared/application/auth-jwt.guard';
import { ApiGuard } from '../../shared/application/api-key.guard';


@ApiTags('categorias')
@ApiSecurity('X-API-KEY')

//@UseGuards(AuthGuardJwt) 
@UseGuards(ApiGuard)
@Controller('categorias')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorias' })
  getCategory(): Promise<CategoryType[]> {
    return this.categoryService.getCategory()
  }

  @Get("subcategorias")
  @ApiOperation({ summary: 'Obtener todas las sub categorias' })
  getSubCategory(): Promise<SubCategoryType[]> {
    return this.categoryService.getSubCategory()
  }
}
