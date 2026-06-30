import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './global-exception-filter';

import { configureSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['verbose'] });

  configureSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      // remove non DTO definied props
      whitelist: true,
      // converts payload into DTO type
      transform: true,
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new GlobalExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
