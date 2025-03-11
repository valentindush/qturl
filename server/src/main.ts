import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204
  })

  const config = new DocumentBuilder()
    .setTitle('QT URLZ')
    .setDescription('The QT URLZ API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  app.setGlobalPrefix('api/v1')  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
