import {  IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DataRedeem, ProductsDetail, RedeemDto } from '../../domain/dto/redeem-in.dto';


export class GetRedeemDto{
    id: number;
}

