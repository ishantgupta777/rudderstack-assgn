import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './common/filters/GlobalException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix('/api/v1');
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
