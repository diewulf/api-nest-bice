// crea un dto llamado BarCodeDto con dos campos, type enum (code128 , ean13) y text
// barcode-create.dto.ts

export enum BarCodeType {
  Code128 = 'code128',
  Ean13 = 'ean13',
}

export class BarCodeDto {
  type: BarCodeType;
  text: string;
  textBottom: boolean;
}