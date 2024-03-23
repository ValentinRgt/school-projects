import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { AdvertismentModule } from './modules/advertisment/advertisment.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LogModule } from './modules/log/log.module';
import { AdminModule } from './modules/admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: 'smtp://localhost:1025',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    AdminModule,
    UserModule,
    HealthModule,
    CompanyModule,
    AdvertismentModule,
    LogModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'admin',
            module: AdminModule,
          },
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'companies',
            module: CompanyModule,
          },
          {
            path: 'advertisments',
            module: AdvertismentModule,
          },
        ],
      },
    ]),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
