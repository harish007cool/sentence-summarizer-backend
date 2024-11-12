import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to allow cookies
  });

  //await app.listen(process.env.PORT ?? 3000);
  await app.listen('https://sentence-summarizer-backend-71j8zj43v-harish007cools-projects.vercel.app');
}
bootstrap();
