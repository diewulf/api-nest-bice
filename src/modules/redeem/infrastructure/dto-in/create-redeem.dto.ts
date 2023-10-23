import {  IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DataRedeem, ProductsDetail, RedeemDto } from '../../domain/dto/redeem-in.dto';


export class CreateRedeemDto implements RedeemDto{
    
    @ApiProperty({ description: 'Datos del cliente'})
    CanjeDetalle: DataRedeem;
    @ApiProperty({ description: 'Datos del producto a canjear' })
    ProductoDetalle: ProductsDetail;
}

