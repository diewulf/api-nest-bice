import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseFilterDto } from '../../shared/domain/base-filter.dto';
import { ViewProduct } from '../domain/entities/product.viewentity';
import { ProductDetailType, ProductType } from './dto/products.out';
import { StockProductsType } from './dto/stock.out';
import { RebajaStockDto } from './dto/rebaja-stock.dto';
import { EOrderProductBy, ProductFilterDto } from './dto/product.filter';
import { ProductResponse } from '../domain/dto/viewproduct.dto';
import { ViewProductDetail } from '../domain/entities/product-detail.viewentity';
import { Product } from '../../product/domain/entities/produc.entity';
import { ProductDetail } from '../../product/domain/entities/product-detail.entity';


@Injectable()
export class ProductsTransferService {
  constructor(
    @InjectRepository(ViewProduct, "mysqlConnection")
    private readonly productViewRepository: Repository<ViewProduct>,
    @InjectRepository(ViewProductDetail, "mysqlConnection")
    private readonly productDetailViewRepository: Repository<ViewProductDetail>,

    @InjectRepository(Product, "postgresConnection")
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail, "postgresConnection")
    private readonly productDetailRepository: Repository<ProductDetail>,

  ) { }


  async productSync(): Promise<any> {
    //const { page, pageSize } = baseFilterDto
    const products = await this.productViewRepository.find()

    for(const product of products){
    
      const productExist  = await this.productRepository.findOneBy({
        id: product.id
      })
      console.log("🚀 ~ file: products-transfer.service.ts:41 ~ ProductsTransferService ~ productSync ~ productExist:", productExist)

      if (productExist) {
        // Si el producto existe, actualízalo
        productExist.nombre = product.nombre
        productExist.nombre_detalle = product.nombreDetalle
        productExist.precio = product.precio
        productExist.idcategoria = product.idCategoria
        productExist.categoria = product.categoria
        productExist.stock = product.stock
        productExist.proveedor = product.proveedor
        productExist.marca = product.marca
        productExist.posicion = product.posicion
        productExist.thumbnail = product.thumbnail
        await this.productRepository.save(productExist);

      } else {
        // Si el producto no existe, créalo
        await this.productRepository.save(product);
      }

    }

    if (!products) {
      throw new NotFoundException(`no hay ningun producto`);
    }

    return products

  }


  async productDetailSync(): Promise<any> {
    //const { page, pageSize } = baseFilterDto
    const products = await this.productDetailViewRepository.find()

    for(const product of products){
      

      const productExist  = await this.productDetailRepository.findOneBy({
        idproducto: product.idproducto
      })

      if (productExist) {

        productExist.nombre = product.nombre
        productExist.nombre_detalle = product.nombre_detalle
        productExist.precio = product.precio
        productExist.idcategoria = product.idcategoria
        productExist.nombre_categoria = product.nombre_categoria
        productExist.sub_categoria = product.sub_categoria
        productExist.stock = product.stock
        productExist.proveedor = product.proveedor
        productExist.descripcion = product.descripcion
        productExist.descripcion_general = product.descripcion_general
        productExist.marca = product.marca
        productExist.thumbnail = product.thumbnail
        productExist.pesoNormal = product.pesoNormal
        productExist.pesoMayor = product.pesoMayor
        productExist.peso_volumetrico = product.peso_volumetrico
        productExist.largo = product.largo
        productExist.alto = product.alto
        productExist.ancho = product.ancho
        productExist.modelo = product.modelo
        productExist.genero = product.genero

        await this.productDetailRepository.save(productExist);
      }else{
        await this.productDetailRepository.save(product);
      }

    }
    if (!products) {
      throw new NotFoundException(`no hay ningun producto detalle`);
    }

    return products

  }



}
