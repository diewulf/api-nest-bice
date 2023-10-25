import { Module } from '@nestjs/common';
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
import { PdfController } from './modules/shared/infrastructure/pdf.controller';
import { PdfService } from './modules/shared/application/pdf.service';
import { BarCodeService } from './modules/shared/application/barcode.service';
import { RedeemService } from './modules/redeem/application/redeem.service';
import { SharedModule } from './modules/shared/infrastructure/shared.module';

console.log(join(__dirname, '..', 'client'))

let localModule = [];
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'local') {
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
    SharedModule,
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
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env', // .env seria tu local que se conecta al de test
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: 'postgresConnection',
      useFactory: postgreSqlConfig,
      inject: [ConfigService],
    }),
  ],

})


export class AppModule { }