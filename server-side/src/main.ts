import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Увімкни CORS для frontend (буде на http://localhost:3000)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://time-tracker-eosin-nine.vercel.app',
    ],
    credentials: true,
  });

  // Глобальна валідація
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on ${port}`);
}
bootstrap();
