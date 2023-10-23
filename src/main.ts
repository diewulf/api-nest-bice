import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './config.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  const configService = app.get(ConfigService);

  //if (configService.get<string>("NODE_ENV") !== "production") {
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api', app, document);
    
  //}
  // solo en produccion se aplica
  if (configService.get<string>("NODE_ENV") === "production") {
    // Helmet puede ayudar a proteger su aplicación de algunas vulnerabilidades web conocidas al configurar los encabezados HTTP
    app.use(helmet());

  }

  /* app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    whitelist: true,
  }));  */

  await app.listen(configService.get<string>("SERVER_PORT"));
  const url = await app.getUrl();

}

bootstrap();
