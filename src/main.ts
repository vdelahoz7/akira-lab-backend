import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173', // tu Vite local
      'https://akira-lab-backend.vercel.app', // cuando lo subas
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
