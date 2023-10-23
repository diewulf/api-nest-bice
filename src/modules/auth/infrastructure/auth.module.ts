import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../application/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../application/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthJwtGuard } from '../../shared/application/auth-jwt.guard';
import { ApiGuard } from '../../shared/application/api-key.guard';


@Module({
    imports: [
        /* TypeOrmModule.forFeature([User]), */
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET'),
              signOptions: { expiresIn: configService.get('JWT_EXPIRETIME') }
            })
          })
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        AuthJwtGuard,
        ApiGuard,
        ConfigService,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        }],
  
})
export class AuthModule { }
