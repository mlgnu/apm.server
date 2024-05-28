import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm/Session';
import entities from './typeorm';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connection = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'mohamed',
    password: '',
    database: 'academic_progression_monitoring',
    entities: entities,
    synchronize: true,
  }).initialize();

  const sessionRepo = (await connection).getRepository(SessionEntity);
  const typeormStore = new TypeormStore({ cleanupLimit: 10 }).connect(
    sessionRepo,
  );

  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'SESSION_ID',
      secret: 'asgpjkwaepogmoiawehgjoaiwejfoiamnwosigja',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
      store: typeormStore,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
