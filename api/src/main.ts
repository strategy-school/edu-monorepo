import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.property] = {
            name: error.property,
            message: Object.values(error.constraints)[0],
          };
        });
        return new BadRequestException({
          errors: formattedErrors,
          message: 'Validation failed',
          name: 'Bad Request',
          _message: 'Validation failed',
        });
      },
    }),
  );
  await app.listen(8000);
}
bootstrap();
