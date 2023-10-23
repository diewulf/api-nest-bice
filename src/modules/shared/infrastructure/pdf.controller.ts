import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from '../application/pdfhtml.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(  private readonly pdfService: PdfService) { }

  @Get()
  async generatePdf(@Res() res: Response): Promise<any> {
   

    try {

      const pdfBuffer = await this.pdfService.generatePdf();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline'); // Muestra el PDF en línea en el navegador
      res.setHeader('Content-Length', pdfBuffer.length.toString());
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).send(error.message);
    }
     

  }
}