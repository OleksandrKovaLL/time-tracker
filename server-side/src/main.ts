import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Увімкни CORS для frontend (буде на http://localhost:3000)
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Глобальна валідація
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,           // Видаляє зайві поля
        forbidNonWhitelisted: true, // Кидає помилку якщо є зайві поля
        transform: true,            // Трансформує типи (string → number)
      }),
  );

  await app.listen(3001); // 👈 Backend на порті 3001
  console.log('🚀 Backend running on http://localhost:3001');
}
bootstrap();