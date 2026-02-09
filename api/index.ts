import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';

let app;

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);

  nestApp.enableCors({
    origin: true,
    credentials: true,
  });

  await nestApp.init();
  return nestApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!app) {
    app = await bootstrap();
  }

  return app.getHttpAdapter().getInstance()(req, res);
}
