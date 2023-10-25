import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from '../application/pdf.service';
import { BarCodeService } from '../application/barcode.service';
import { RedeemService } from '../../redeem/application/redeem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Redeem } from '../../redeem/domain/redeem.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Redeem], "postgresConnection"),
    ],
    controllers: [PdfController],
    providers: [PdfService, BarCodeService, RedeemService],
})
export class SharedModule { }