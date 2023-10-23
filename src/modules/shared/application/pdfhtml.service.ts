import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as pdf from 'html-pdf';
import { join } from 'path';

const root= join(__dirname, '../../../../', 'client');

@Injectable()
export class PdfService {
  async generatePdf(): Promise<Buffer> {
    
     const htmlContent = `<table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tbody><tr>
      <td style="border:1px solid #c0d72f;"><table width="700" border="0" cellspacing="0" cellpadding="0">
    <tbody><tr>
      <td width="420" style="font-family:Arial, Helvetica, sans-serif; font-size:38px; font-weight:bold; padding:20px 0 0 20px; color:#000;">ESTIMADO</td>
      <td width="83" rowspan="2"><img src="${root}/img/voucher/falabella.jpg" width="44" height="118" alt="falabella"></td>
      <td width="197" rowspan="2"><img src="/img/voucher/beliv.jpg" width="164" height="118" alt="Beliv"></td>
    </tr>
    <tr>
      <td style="font-family:Arial, Helvetica, sans-serif; font-size:23px; font-weight:bold; padding:0 20px 20px 20px; color:#000;">CLIENTE
      ${root}
      </td>
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
  
    return new Promise<Buffer>((resolve, reject) => {
      const options = {
        format: 'Letter',
        border: '10mm'
      };
      

      pdf.create(htmlContent, options).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });

  }

}