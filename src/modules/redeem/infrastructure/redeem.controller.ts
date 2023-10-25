import { Get, Post, Body, Res, Param, Controller } from '@nestjs/common';
import { RedeemService } from '../application/redeem.service';
import { EStatus, RedeemResponse } from '../domain/dto/redeem-in.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateRedeemDto } from './dto-in/create-redeem.dto';
import { CustomController } from '../../shared/infrastructure/custom.decorator';
import { Redeem } from '../domain/redeem.entity';
import { RedeemCreateService } from '../application/redem-create.service';


@CustomController({ tags: ['productos'], security: true, useAuthGuard: true })
@Controller('canje')
export class RedeemController {

  constructor(
    private readonly redeemService: RedeemService,
    private readonly redeemCreateService: RedeemCreateService,
  ) { }


  @ApiOperation({ summary: 'Hacer canje' })
  @Post()
  async doRedeem(@Body() createRedeemDto: CreateRedeemDto, @Res() res: Response): Promise<RedeemResponse> {
    const response: RedeemResponse = await this.redeemCreateService.doRedeem(createRedeemDto)
    if (response.status === EStatus.SUCCESS) {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
    return response
  }
  @Get(":id")
  async getRedeem(@Param('id') id: number): Promise<Redeem> {
    const responde = await this.redeemService.getRedeem(id)
    return responde
  }

}
