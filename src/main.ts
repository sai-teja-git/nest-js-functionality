import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.enableCors()
  await app.listen(process.env.PORT);
  console.log(`Server Running On ${process.env.PORT}`)
}
bootstrap();
