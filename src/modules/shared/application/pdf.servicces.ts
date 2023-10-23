import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';
import { createReadStream } from 'fs';
import * as blobStream from 'blob-stream';

@Injectable()
export class PdfServices2 {

  async generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = PDFDocument;
      const stream = doc.pipe(blobStream());

      // draw some text
      doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

      // some vector graphics
      doc
        .save()
        .moveTo(100, 150)

        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

      doc.circle(280, 200, 50).fill('#6600FF');

      // an SVG path
      doc
        .scale(0.6)
        .translate(470, 130)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

      // and some justified text wrapped into columns
      const lorem =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar, sapien et cursus ullamcorper, lectus eros malesuada libero, vitae facilisis sem leo nec est.';
      doc
        .text('And here is some wrapped text...', 100, 300)
        .font('Times-Roman', 13)
        .moveDown()
        .text(lorem, {
          width: 412,
          align: 'justify',
          indent: 30,
          columns: 2,
          height: 300,
          ellipsis: true,
        });

      // end and return the stream
      doc.end();
      return stream;

    })

    return pdfBuffer;
  }



  async generatePdf(): Promise<any> {

    const htmlContent = `<table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tbody><tr>
      <td style="border:1px solid #c0d72f;"><table width="700" border="0" cellspacing="0" cellpadding="0">
    <tbody><tr>
      <td width="420" style="font-family:Arial, Helvetica, sans-serif; font-size:38px; font-weight:bold; padding:20px 0 0 20px; color:#000;">ESTIMADO</td>
      <td width="83" rowspan="2"><img src="/img/voucher/falabella.jpg" width="44" height="118" alt="falabella"></td>
      <td width="197" rowspan="2"><img src="/img/voucher/beliv.jpg" width="164" height="118" alt="Beliv"></td>
    </tr>
    <tr>
      <td style="font-family:Arial, Helvetica, sans-serif; font-size:23px; font-weight:bold; padding:0 20px 20px 20px; color:#000;">CLIENTE </td>
    </tr>
    <tr>
      <td colspan="3" style="border-top:1px solid #c0d72f; font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:bold; padding:20px 20px 0 20px; color:#000;">HAS RECIBIDO UNA GIFT CARD DE $ 200.000</td>
    </tr>
    <tr>
      <td colspan="3" style="border-bottom:1px solid #c0d72f; font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; padding:0 20px 20px 20px; color:#000;">VALIDEZ: hasta 21 / 07 / 2024</td>
    </tr>
    <tr>
      <td colspan="3" style="padding:20px;"><table width="660" border="0" cellspacing="0" cellpadding="0">
        <tbody><tr>
          <td width="332" style="font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; color:#000; font-style:italic;">ÚSALA EN</td>
          <td width="328">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" valign="middle"><img src="img/sodimac.jpg" width="125" height="60" alt="falabella - sodimac"></td>
          <td align="center" valign="middle"><img src="img/codigo-01.jpg" width="206" height="117" alt="falabella - sodimac"></td>
          </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="center" valign="middle"><img src="img/tottus.jpg" width="169" height="49" alt="tottus"></td>
          <td align="center" valign="middle"><img src="img/codigo-02.jpg" width="271" height="112" alt="falabella - sodimac"></td>
          </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; color:#000; text-align:center;">Número de Giftcard</td>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; color:#000; text-align:center;">Código de Seguridad</td>
        </tr>
      </tbody></table></td>
    </tr>
    <tr>
      <td colspan="3" style="padding:20px; border-top:1px solid #c0d72f;"><table width="660" border="0" cellspacing="0" cellpadding="0">
        <tbody><tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; color:#000;">DIRECCIÓN</td>
          </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#000;">Uso en Falabella, Sodimac, Tottus y Falabella.com *</td>
          </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; color:#000;">INSTRUCCIONES</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#000;">Presenta tu voucher directamente desde tu Smartphone en el momento de pagar. Para Tottus busca las cajas habilitadas para recibir gift card digitales. Gift Card no aplica en cajas de Autoatención.</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#000; font-weight:bold;">* Para compras en Falabella.com debes filtrar solo productois vendidos por FALABELLA.</td>
          </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; color:#000;">CONDICIONES DE USO</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#000;">El uso, robo, pérdida o extravío de la gift card es de exclusiva responsabilidad del portador. Los términos y condiciones de uso se encuentran protocolizados con fecha 8 de julio de 2016 en la notaría de Santiago Francisco Leiva Carvajal.</td>
        </tr>
        </tbody></table></td>
    </tr>
    </tbody></table>
  </td>
    </tr>
  </tbody></table>`; // Tu HTML aquí
    return htmlContent;

  }


}