import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FileOperationModule } from './file-operation/file-operation.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { EncryptionService } from './services/encryption.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from './services/http.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuScreenMappingModule } from './menu-screen-mapping/menu-screen-mapping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: env.JWT_TOKEN_LIFE }
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: env.MONGO_DB_CLOUD_URL,
      }),
    }),
    FileOperationModule,
    MenuScreenMappingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EncryptionService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: HttpInterceptor,
    // },
  ],
})
export class AppModule { }
