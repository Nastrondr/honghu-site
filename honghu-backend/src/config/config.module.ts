import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import {
  appConfig,
  jwtConfig,
  databaseConfig,
  redisConfig,
  swaggerConfig,
  uploadConfig,
  ossConfig,
} from './configuration';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development', '.env'],
      isGlobal: true,
      load: [
        appConfig,
        jwtConfig,
        databaseConfig,
        redisConfig,
        swaggerConfig,
        uploadConfig,
        ossConfig,
      ],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
