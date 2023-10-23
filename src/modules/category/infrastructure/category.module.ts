import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { CategoryService } from '../application/category.service';
import { ApiGuard } from '../../shared/application/api-key.guard';


@Module({
  imports: [
    /* TypeOrmModule.forFeature([Category]),  */
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRETIME') }
      })
    })

  ],
  providers: [CategoryService,ApiGuard],
  controllers: [CategoryController],
})
export class CategoryModule { }
