import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedocOptions, RedocModule } from 'nestjs-redoc';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const redocOptions: RedocOptions = {
    title: 'Hello Nest',
    logo: {
      url: 'https://docs.nestjs.com/assets/logo-small.svg',
      altText: 'Nest.js Logo',
    },
    hideDownloadButton: false,
    hideHostname: false,
    auth: {
      enabled: false,
      user: 'admin',
      password: '123',
    },
  };

  const config = new DocumentBuilder()
    .setTitle('Nest JS')
    .setDescription('API Description')
    .setVersion('1.0')
    .addTag('Authentication', 'Health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  await RedocModule.setup('/docs', app, document, redocOptions);

  await app.listen(3000);

  Logger.log(`Server is running on: ${await app.getUrl()}`, 'NestApplication');
}
bootstrap();
