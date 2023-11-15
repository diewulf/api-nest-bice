import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { BarCodeService } from './barcode.service';
import { BarCodeDto, BarCodeType } from './dto/barcode-create.dto';
import { FallabellaPdfDto } from './dto/fallabella-pdf.dto';
import PDFDocument from 'pdfkit';
import { RedeemService } from '../../redeem/application/redeem.service';
import { ProductsDetail } from '../../redeem/domain/redeem.entity';



@Injectable()
export class PdfService {

  baseUrl: string;
  constructor(
    private readonly barcodeService: BarCodeService,
    private readonly redeemService: RedeemService
  ) { }

  createBarCodeDto(text: string): BarCodeDto {
    return {
      type: BarCodeType.Code128,
      text: text,
      textBottom: false,
    };
  }

  async fallabellaVoucherPdf(uuid: string): Promise<Buffer> {

    const storedRedeem = await this.redeemService.getRedeemByUuid(uuid)
    const productsDetail: ProductsDetail = storedRedeem.datos_productos
    const dateExpired = productsDetail.fecha_vencimiento
    const amount = productsDetail.monto.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
    const clientName = storedRedeem.nombre_cliente.toUpperCase()
    const gcNumberTottus = productsDetail.gc_tottus

    const securityCod = productsDetail.cod_seguridad

    const barCodeDtoFalla: BarCodeDto = this.createBarCodeDto(productsDetail.falabella_sodimac);
    const barCodeDtoGcTottus: BarCodeDto = this.createBarCodeDto(productsDetail.gc_tottus);

    const fallabellaBarCodeBuffer = await this.barcodeService.generateBarcodeImage(barCodeDtoFalla)
    const gcTottusCodeBuffer = await this.barcodeService.generateBarcodeImage(barCodeDtoGcTottus)

    const pdfBuffer: Buffer = await new Promise(resolve => {

      const doc = new PDFDocument({ bufferPages: true, size: 'LEGAL', margin: 5 });
      doc.moveDown();


      const marginLeft = 5;
      const maxWidth = 600;

      doc.fontSize(36).font('Helvetica-Bold').text(`ESTIMADO`, 20, 30)
      doc.fontSize(18).font('Helvetica-Bold').text(clientName, { width: 300, height: 300 }, 70, 100)

      doc.moveDown();
      doc.moveDown();
      doc.fontSize(18).font('Helvetica-Bold').text(`HAS RECIBIDO UNA GIFT CARD DE ${amount}`, { width: 700 }, 150, 100)
      doc.fontSize(16).font('Helvetica-Bold').text(`VALIDEZ: hasta ${dateExpired}`, { width: 700 })

      doc.fontSize(16).font('Helvetica-BoldOblique').text(`ÚSALA EN`, { width: 700 }, 240, 0)


      doc.fontSize(14).font('Helvetica-Bold').text(`                          ${gcNumberTottus}                                             ${securityCod} `, { width: 700 }, 515, 200)

      doc.fontSize(18).font('Helvetica-Bold').text(`DIRECCIÓN`, { width: 700 }, 570, 0)
      doc.fontSize(14).font('Helvetica').text(`Uso en Falabella, Sodimac, Tottus y Falabella.com *`, { width: 700 }, 600, 0)


      doc.fontSize(18).font('Helvetica-Bold').text(`INSTRUCCIONES`, { width: 700 }, 640, 0)
      doc.fontSize(14).font('Helvetica').text(`Presenta tu voucher directamente desde tu Smartphone en el momento de pagar. Para Tottus busca las cajas habilitadas  para recibir gift card digitales. Gift Card no aplica en cajas de Autoatención.`, { width: 560 }, 670, 0)
      doc.moveDown();
      doc.fontSize(14).font('Helvetica-Bold').text(`* Para compras en Falabella.com debes filtrar solo productois vendidos por FALABELLA.`)

      doc.moveDown();
      doc.fontSize(18).font('Helvetica-Bold').text(`CONDICIONES DE USO`, { width: 700 })
      doc.fontSize(14).font('Helvetica').text(`El uso, robo, pérdida o extravío de la gift card es de exclusiva responsabilidad del portador. Los términos y condiciones de uso se encuentran protocolizados con fecha 8 de julio de 2016 en la notaría de Santiago Francisco Leiva Carvajal.`, { width: 560 })


      doc.image(join(process.cwd(), "client/img/voucher/falabella.jpg"), 350, 0, { align: 'right', width: 44, height: 118 })
      doc.image(join(process.cwd(), "client/img/voucher/beliv.jpg"), 420, 0, { align: 'right', width: 164, height: 118 })

      doc.image(join(process.cwd(), "client/img/voucher/sodimac.jpg"), 90, 280, { align: 'left', width: 125, height: 60 })
      doc.image(join(process.cwd(), "client/img/voucher/tottus.jpg"), 90, 420, { align: 'left', width: 169, height: 49 })

      doc.rect(5, marginLeft, maxWidth, 120).stroke("#c0d72f");
      doc.rect(5, marginLeft, maxWidth, 900).stroke("#c0d72f");
      doc.rect(5, 125, maxWidth, 90).stroke("#c0d72f");
      doc.rect(5, 215, maxWidth, 330).stroke("#c0d72f");
      doc.image(fallabellaBarCodeBuffer, 350, 270, { width: 206, height: 90 })
      doc.image(gcTottusCodeBuffer, 350, 400, { width: 206, height: 90 })



      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
      doc.end()
    })
    return pdfBuffer;
  }



}