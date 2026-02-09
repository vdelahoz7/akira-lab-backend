import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

export default async function handler(req: any, res: any) {
    const app = await NestFactory.create(AppModule);

    // Enable CORS if needed
    app.enableCors();

    await app.init();

    const instance = app.getHttpAdapter().getInstance();
    return instance(req, res);
}
