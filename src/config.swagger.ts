import { DocumentBuilder } from '@nestjs/swagger';
export const configSwagger = new DocumentBuilder()
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