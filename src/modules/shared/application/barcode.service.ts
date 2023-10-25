import { Injectable } from '@nestjs/common';
import * as bwipjs from 'bwip-js';
import { BarCodeDto } from './dto/barcode-create.dto';

@Injectable()
export class BarCodeService {


  async generateBarcodeImage(barCodeDto: BarCodeDto): Promise<Buffer> {
    const opts = {
      bcid:  barCodeDto.type, // Barcode type, such as 'ean13' or 'isbn'
      text: barCodeDto.text, // Barcode data
      scale: 3, // Scale factor for the image
      includetext: barCodeDto.textBottom, // Include human-readable text below the barcode
    };

    return new Promise((resolve, reject) => {
      bwipjs.toBuffer(opts, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }
}