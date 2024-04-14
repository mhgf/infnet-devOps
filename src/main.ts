import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(env.PORT ?? 3000);
}
bootstrap();
