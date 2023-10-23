import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseFilterDto } from '../../shared/domain/base-filter.dto';

import { ProductDetailType, ProductType } from './dto/products.out';
import { StockProductsType } from './dto/stock.out';
import { stockDummy } from '../domain/dummies/stock.dummy';
import { RebajaStockDto } from './dto/rebaja-stock.dto';
import { EOrderProductBy, ProductFilterDto } from './dto/product.filter';
import { CreateGcInDto } from './dto/create-gc-in.dto';
import { StockGc } from '../domain/entities/stock-gc.entity';
import { StockService } from './stock.service';
import { ProductResponse } from '../domain/dto/viewproduct.dto';
import { Product } from '../domain/entities/produc.entity';
import { ProductDetail } from '../domain/entities/product-detail.entity';
import { IMG_BASE, IMG_NOT_FOUND } from '../../shared/constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(StockGc, "postgresConnection")
    private readonly stockGcRepository: Repository<StockGc>,
    @InjectRepository(Product, "postgresConnection")
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail, "postgresConnection")
    private readonly productDetailRepository: Repository<ProductDetail>,
    private readonly stockService: StockService,

  ) { }

  async getProducts(productFilterDto: ProductFilterDto): Promise<ProductResponse> {

    const { page, pageSize, idCategory, orderBy } = productFilterDto
    let orderCondition = {};
    if (!orderBy) {
      throw new NotFoundException(`sys: no hay ningun orbderBy`);
    }

    const whereCondition = { idcategoria: idCategory };

    switch (orderBy) {
      case EOrderProductBy.POSITION:
        orderCondition = { posicion: 'ASC' };
        break;
      case EOrderProductBy.LOWPRICES:
        orderCondition = { precio: 'ASC' };
        break;
      case EOrderProductBy.HIGHPRICES:
        orderCondition = { precio: 'DESC' };
        break;
    }

    const [productRaw, totalCount] = await Promise.all([
      this.productRepository.find({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: whereCondition,
        order: orderCondition,
      }),
      this.productRepository.countBy(whereCondition),
    ]);
    console.log("🚀 ~ file: products.service.ts:63 ~ ProductsService ~ getProducts ~ productRaw:", productRaw)
    const maxPage = Math.ceil(totalCount / pageSize);

    if (!productRaw) {
      throw new NotFoundException(`no hay ningun producto`);
    }

    const products: Product[] = productRaw.map((product) => ({
      ...product,
      thumbnail: product.thumbnail ? `${IMG_BASE}/${product.thumbnail}` : IMG_NOT_FOUND,
      logo: `${IMG_BASE}/cencosud-logo.jpg`,
      url: `${product.thumbnail}`, // Reemplaza 'aquí_tu_url' con la URL que desees agregar
    }));

    const response: ProductResponse = {
      products,
      page,
      pageSize,
      maxPage,
    };
    return response

  }
  // TODO , logo 
  async getProductsDetail(idProducto: number): Promise<ProductDetail> {
    //const { page, pageSize } = baseFilterDto

    const  product = await this.productDetailRepository.findOneBy({
      idproducto: idProducto
    })

    const productNew: ProductDetail = {
      ...product,
      thumbnail: product.thumbnail ? `${IMG_BASE}/${product.thumbnail}` : IMG_NOT_FOUND,
      logo: `${IMG_BASE}/cencosud-logo.jpg`,
    };

    if (!productNew) {
      throw new NotFoundException(`no hay ningun producto`);
    }

    return productNew

  }

  // TODO stock solo para GC, a futuro debe estar preparado para cualquier producto

  async getProductsStock(idProduct: number): Promise<number> {
    
    const stock = await this.productRepository.findOneBy({
      id: idProduct
    })


    if (!stock) {
      throw new NotFoundException(`no hay ningun stock`);
    }
    return stock.stock
  }


  setProductsStock(rebajaStockDto: RebajaStockDto): StockProductsType {
    const { idProducto, montoDescontar } = rebajaStockDto
    let stockData;


    if (idProducto !== undefined) {
      const productIndex = stockDummy.findIndex(item => item.idProducto === +idProducto);

      stockDummy[productIndex].stock -= montoDescontar;
      stockData = stockDummy[productIndex]
    }


    if (!stockData) {
      throw new NotFoundException(`no hay ningun stock`);
    }
    return stockData
  }

}