import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AllExceptionFilters from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilters());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3030);
}
bootstrap();
