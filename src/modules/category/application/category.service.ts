import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseFilterDto } from '../../shared/domain/base-filter.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryType, SubCategoryType, categoryDummy, subCategoryDummy } from './dto/category.out';
import { CategoryFilterDto, SubCategoryFilterDto } from './dto/filter/category.filter';

@Injectable()
export class CategoryService {
  /*   constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {} */

    async getCategory(): Promise<CategoryType[]> {
        //const { page, pageSize } = baseFilterDto
        const category = categoryDummy;
        /* const category = await this.categoryRepository.find({
            skip: (page - 1) * pageSize,
            take: pageSize
        }) */

        if(!category){
            throw new NotFoundException(`no hay ningun producto`);
        }
        return category

    }

    async getSubCategory(): Promise<SubCategoryType[]> {
      
        
        
        const subCategory = subCategoryDummy;
        

/*         if (idCat !== undefined) {
            
            subCategory = subCategory.filter(item => item.idCat === +idCat);
        }

        if (idSubCat !== undefined) {
            subCategory = subCategory.filter(item => item.idSubCat === +idSubCat);
        }

        if (subCategoria !== undefined) {
            subCategory = subCategory.filter(item => item.subCategoria === subCategoria);
        }
 */
    
        /* const category = await this.categoryRepository.find({
            skip: (page - 1) * pageSize,
            take: pageSize
        }) */

        if(!subCategory){
            throw new NotFoundException(`Sub Category not found`);
        }
        return subCategory

    }
    
}