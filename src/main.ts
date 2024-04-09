import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Red Social OnLine')
    .setDescription('The Red Social OnLine API endpoints')
    .setVersion('1.0')
    .addServer('http://localhost:3001', 'Local Server')
    .addServer('https://api.example.com', 'Production Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
  console.log('Listening in the port', process.env.PORT);
}
bootstrap();
