import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  const configService = app.get(ConfigService);



  const config = new DocumentBuilder()
    .setTitle('Bice API Wellnes Doc')
    .setDescription('Api productos')
    .setVersion('2.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addApiKey({
      type: 'apiKey',
      name: 'X-API-KEY',
      in: 'header',
    }, 'X-API-KEY')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
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
