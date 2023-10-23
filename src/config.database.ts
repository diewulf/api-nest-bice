import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config'; // Asegúrate de importar tu servicio de configuración

export const postgreSqlConfig = async (): Promise<TypeOrmModuleOptions> => {
  const configService = new ConfigService(); // Crea una instancia de ConfigService
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:  true,
    autoLoadEntities: true,
  };
};


export const mysqlConfig = async (): Promise<TypeOrmModuleOptions> => {
  const configService = new ConfigService();
  return {
    type: 'mysql',
    host: configService.get('MYSQL_HOST'), // Cambia las claves y valores según tus variables de entorno o archivos de configuración
    port: configService.get<number>('MYSQL_PORT'),
    username: configService.get('MYSQL_USER'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    entities: [__dirname + '/**/*.viewentity{.ts,.js}'],
  };
};


