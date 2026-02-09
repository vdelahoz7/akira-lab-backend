import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { AuthModule } from './modules/auth.module';
import { ClientsModule } from './modules/clients.module';
import { ProjectsModule } from './modules/projects.module';
import { PaymentsModule } from './modules/payments.module';
import { NotificationsModule } from './modules/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'), // ⚠️ usa SOLO esto en Vercel
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    AuthModule,
    ClientsModule,
    ProjectsModule,
    PaymentsModule,
    NotificationsModule,
  ],

  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
