import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as express from 'express';
dotenv.config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json({ limit: '10mb' })); 
  app.use(express.urlencoded({ limit: '10mb', extended: true })); 

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001','https://tnndshn.ge','https://master.d36w7b3s05ygo7.amplifyapp.com'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))

  await app.listen(3000);
}
bootstrap();
