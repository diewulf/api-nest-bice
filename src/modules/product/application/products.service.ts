import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockProductsType } from './dto/stock.out';
import { stockDummy } from '../domain/dummies/stock.dummy';
import { RebajaStockDto } from './dto/rebaja-stock.dto';
import { EOrderProductBy, ProductFilterDto } from './dto/product.filter';
import { StockGc } from '../domain/entities/stock-gc.entity';
import { ProductResponse } from '../domain/dto/viewproduct.dto';
import { Product } from '../domain/entities/product.entity';
import { ProductDetail } from '../domain/entities/product-detail.entity';
import { UrlBaseService } from '../../shared/application/url-base.service';
import { IMG_NOT_FOUND } from '../../shared/constants';

@Injectable()
export class ProductService {

  private urlBaseImg: string;

  constructor(
    @InjectRepository(StockGc, "postgresConnection")
    private readonly stockGcRepository: Repository<StockGc>,
    @InjectRepository(Product, "postgresConnection")
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail, "postgresConnection")
    private readonly productDetailRepository: Repository<ProductDetail>,
    private readonly urlBaseService: UrlBaseService

  ) {

    const baseUrl = this.urlBaseService.urlBase();
    this.urlBaseImg = `${baseUrl}/img`;
    
  }

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
    const maxPage = Math.ceil(totalCount / pageSize);

    if (Object.keys(productRaw).length === 0) {
      throw new NotFoundException(`no hay ningun producto`);
    }

    // falabella-logo.jpg

    const products: Product[] = productRaw.map((product) => {
      const isFalabella = product.marca && product.marca.toLowerCase().includes('falabella');
      const logoFileName = isFalabella ? 'falabella-logo.jpg' : 'cencosud-logo.jpg';    
      return {
        ...product,
        thumbnail: product.thumbnail ? `${this.urlBaseImg}/${product.thumbnail}` : `${this.urlBaseImg}/${IMG_NOT_FOUND}`,
        logo: `${this.urlBaseImg}/${logoFileName}`,
        img: [`${this.urlBaseImg}/${product.thumbnail}`], // TODO Reemplaza 'aquí_tu_url' con la URL que desees agregar
      };
    });

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

    const product = await this.productDetailRepository.findOneBy({
      id: idProducto
    })

    if (!product) {
      throw new NotFoundException(`no hay ningun producto`);
    }

    const isFalabella = product.marca && product.marca.toLowerCase().includes('falabella');
    const logoFileName = isFalabella ? 'falabella-logo.jpg' : 'cencosud-logo.jpg';  

    const productFormated: ProductDetail = {
      ...product,
      thumbnail: product.thumbnail ? `${this.urlBaseImg}/${product.thumbnail}` : `${this.urlBaseImg}/${IMG_NOT_FOUND}`,
      logo: `${this.urlBaseImg}/${logoFileName}`,
      img: [`${this.urlBaseImg}/${product.thumbnail}`]
    };


    return productFormated
  }

  // TODO stock solo para GC, a futuro debe estar preparado para cualquier producto

  async getProductsStock(idProduct: number): Promise<number> {
    const stock = await this.productRepository.findOneBy({ id: idProduct })

    if (!stock)
      throw new NotFoundException(`no hay ningun stock`)
    return stock.stock
  }

  async discountStockProductByOne(idProducto: number): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: idProducto })
    const productDetail = await this.productDetailRepository.findOneBy({ id: idProducto })
    product.stock -= 1;
    productDetail.stock -= 1;
    await this.productRepository.save(product);
    await this.productDetailRepository.save(productDetail);

    return
  }

  async getProductById(idProducto : number) : Promise<Product>{
    return  await this.productRepository.findOneBy({ id: idProducto })
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
