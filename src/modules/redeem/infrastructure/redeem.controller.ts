import { , Get, Post, Body, Res, Param } from '@nestjs/common';
import { RedeemService } from '../application/redeem.service';
import { EStatus, RedeemResponse } from '../domain/dto/redeem-in.dto';
import {  ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateRedeemDto } from './dto-in/create-redeem.dto';
import { CustomController } from '../../shared/infrastructure/custom.decorator';


@CustomController({ tags: ['productos'], security: true, useAuthGuard: true })
export class RedeemController {

  constructor(
    private readonly redeemService: RedeemService,
  ) { }


  @ApiOperation({ summary: 'Hacer canje' })
  @Post()
  async addRedeem(@Body() createRedeemDto: CreateRedeemDto, @Res() res: Response): Promise<RedeemResponse> {
    const response : RedeemResponse = await this.redeemService.doRedeem(createRedeemDto)
    if(response.status === EStatus.SUCCESS){
      res.status(200).send(response);
    }else{
      res.status(400).send(response);
    }
    
    return response
  }
  @Get(":id")
  async getRedeem(@Param('id') id: number): Promise<any> {
    const responde = await this.redeemService.getRedeem(id)
    return responde
  }

}
