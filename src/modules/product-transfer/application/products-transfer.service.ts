import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewProduct } from '../domain/entities/product.viewentity';
import { ViewProductDetail } from '../domain/entities/product-detail.viewentity';
import { Product } from '../../product/domain/entities/product.entity';
import { ProductDetail } from '../../product/domain/entities/product-detail.entity';
import { StockGc } from '../../product/domain/entities/stock-gc.entity';
import { ConfigService } from '@nestjs/config';


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
    @InjectRepository(StockGc, "postgresConnection")
    private readonly stockGcRepository: Repository<StockGc>,
    private readonly configService: ConfigService

  ) { }

  async resetStock(): Promise<any> {
    // configService obtener el host
    // solo usar este metodo para el ambiente DEV o local
    if (this.configService.get<string>("NODE_ENV") === "local"){
      await this.stockGcRepository.update({}, { rut_cliente: null })
      const stock = await this.stockGcRepository
        .createQueryBuilder("stock")
        .select("stock.id_producto", "id_producto")
        .addSelect("COUNT(*)", "count")
        .where("stock.rut_cliente IS NULL")
        .groupBy("stock.id_producto")
        .getRawMany();
  
      await this.productRepository.update({}, { stock: 0 })
      await this.productDetailRepository.update({}, { stock: 0 })
  
      for (const row of stock) {
        const { id_producto, count } = row;
        await this.productRepository.update({ id: id_producto }, { stock: count });
        await this.productDetailRepository.update({ id: id_producto }, { stock: count });
      }
  
      return stock

    }else{
      return "Solo se debe hacer en dev"
    }   
  }

  async productSync(): Promise<any> {
    //const { page, pageSize } = baseFilterDto
    const products = await this.productViewRepository.find()

    for (const productView of products) {

      const productExist = await this.productRepository.findOneBy({
        id: productView.id
      })

      if (productExist) {
        // Si el producto existe, actualízalo
        productExist.nombre = productView.nombre
        productExist.descripcion = productView.descripcion
        productExist.precio = productView.precio
        productExist.idcategoria = productView.idcategoria
        productExist.categoria = productView.categoria
        productExist.stock = productView.stock
        productExist.proveedor = productView.proveedor
        productExist.marca = productView.marca
        productExist.posicion = productView.posicion
        productExist.thumbnail = productView.thumbnail
        await this.productRepository.save(productExist);

      } else {
        // Si el producto no existe, créalo
        await this.productRepository.save(productView);
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

    for (const product of products) {


      const productExist = await this.productDetailRepository.findOneBy({
        id: product.id
      })

      if (productExist) {

        productExist.nombre = product.nombre

        productExist.precio = product.precio
        productExist.idcategoria = +product.idcategoria
        productExist.categoria = product.nombre_categoria
        productExist.sub_categoria = product.sub_categoria
        productExist.stock = product.stock
        productExist.proveedor = product.proveedor
        productExist.descripcion = product.descripcion
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
      } else {
        await this.productDetailRepository.save(product);
      }

    }
    if (!products) {
      throw new NotFoundException(`no hay ningun producto detalle`);
    }

    return products

  }



}
