import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ProductsModule } from './modules/product/insfrastrructure/products.module';
import { CategoryModule } from './modules/category/infrastructure/category.module';
import { AuthModule } from './modules/auth/infrastructure/auth.module';
import { RedeemModule } from './modules/redeem/infrastructure/redeem.module';
import { postgreSqlConfig, mysqlConfig } from './config.database';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductTransferMyModule } from './modules/product-transfer/insfrastrructure/products-transfer.module';


let localModule = [];

if (process.env.NODE_ENV === 'dev') {
  // Importar el módulo solo si la aplicación se está ejecutando en localhost
  localModule = [
    ProductTransferMyModule,
    TypeOrmModule.forRootAsync({
      name: 'mysqlConnection',
      useFactory: mysqlConfig,
      inject: [ConfigService],
    })
  ];
}
@Module({

  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
    ...localModule,
    AuthModule,
    RedeemModule,
    ProductsModule,
    CategoryModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      name: 'postgresConnection',
      useFactory: postgreSqlConfig,
      inject: [ConfigService],
    }),

  ],
})


export class AppModule {}