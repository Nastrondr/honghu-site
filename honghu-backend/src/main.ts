import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.APP_URL || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const instance = app.getHttpAdapter().getInstance();
  instance.set('json spaces', 2);

  const originalJson = instance.response.json;
  instance.response.json = function (body: unknown): unknown {
    const serialized = JSON.stringify(body, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    });
    return originalJson.call(this, JSON.parse(serialized));
  };

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || '梧桐·鸿鹄大赛平台 API')
    .setDescription(process.env.SWAGGER_DESCRIPTION || 'API 文档')
    .setVersion(process.env.SWAGGER_VERSION || '1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', '认证相关')
    .addTag('Users', '用户相关')
    .addTag('Competitions', '赛事相关')
    .addTag('News', '新闻相关')
    .addTag('Health', '健康检查')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
