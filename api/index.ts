import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Express } from 'express';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

let server: Express;

async function bootstrap(): Promise<Express> {
  const nestApp: INestApplication = await NestFactory.create(AppModule);

  nestApp.enableCors({
    origin: true,
    credentials: true,
  });

  await nestApp.init();

  const adapter = nestApp.getHttpAdapter() as ExpressAdapter;

  return adapter.getInstance();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (!server) {
    server = await bootstrap();
  }

  server(req, res);
}
