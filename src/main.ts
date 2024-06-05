import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT } from '@configs/app.config';

import { AppModule } from './app.module';
import { setupSwagger } from '@configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Enable CORS
  app.enableCors();

  // Apply middleware helmet
  // app.use(helmet());

  // Apply middleware compression
  app.use(compression());

  setupSwagger(app);

  await app.listen(PORT);
  Logger.log(`http://localhost:${PORT}/api`);
}
bootstrap();
