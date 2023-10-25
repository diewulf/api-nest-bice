import { Controller, Get, Res, Param } from '@nestjs/common';
import { PdfService } from '../application/pdf.service';
import { Response } from 'express';
@Controller('url')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
  ) { }

  @Get('pdf/:uuid')
  async generatePdf(@Param('uuid') uuid, @Res() res: Response){
    try {

      const pdfBuffer = await this.pdfService.fallabellaVoucherPdf(uuid);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Content-Length': pdfBuffer.length,
      })
      res.end(pdfBuffer);
    } catch (error) {
      res.status(500).send(error.message);
    }

  }

}