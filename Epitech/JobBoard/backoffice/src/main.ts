import { NestFactory } from '@nestjs/core';
import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as multer from 'multer';

async function bootstrap() {
  const whitelist = [
    'http://127.0.0.1',
    'http://127.0.0.1:5173',
    'http://localhost',
    'http://localhost:5173',
  ];

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        new Logger().warn(origin + ' not allowed to CORS');
        throw new HttpException(
          origin + ' not allowed to CORS',
          HttpStatus.FORBIDDEN,
        );
      }
    },
    credentials: true,
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('API LeBonDéveloppeur')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
