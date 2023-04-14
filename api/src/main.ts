import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
  });
  app.use(
    session({
      secret: 'lamagramma',
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 60000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(8000);
}
bootstrap();
