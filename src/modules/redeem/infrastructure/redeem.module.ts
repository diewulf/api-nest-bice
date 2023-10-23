import { Module } from '@nestjs/common';
import { RedeemController } from './redeem.controller';
import { RedeemService } from '../application/redeem.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiGuard } from '../../shared/application/api-key.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Redeem } from '../domain/redeem.entity';
import { StockService } from '../../product/application/stock.service';
import { StockGc } from '../../product/domain/entities/stock-gc.entity';
import { Product } from '../../product/domain/entities/produc.entity';
import { RedeemCreate } from '../application/redem-create';



@Module({
  imports: [
    TypeOrmModule.forFeature([Redeem, StockGc, Product], "postgresConnection"),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRETIME') }
      })
    })
  ],

  controllers: [RedeemController],
  providers: [RedeemService, StockService, RedeemCreate],
})
export class RedeemModule { }