import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Configure body parser to accept larger payloads
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
  
  console.log('Body parser configuré avec une limite de 1MB');
  
  // Global prefix for API routes
  app.setGlobalPrefix('api');
  
  // Enable global validation using class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        console.log('Erreurs de validation:', JSON.stringify(errors, null, 2));
        const messages = errors.map(error => {
          return {
            property: error.property,
            value: error.value,
            constraints: error.constraints
          };
        });
        console.log('Messages d\'erreur:', JSON.stringify(messages, null, 2));
        return new BadRequestException(messages);
      },
    }),
  );

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('PlantNet API')
    .setDescription('The PlantNet API for connected plant management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3006);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
