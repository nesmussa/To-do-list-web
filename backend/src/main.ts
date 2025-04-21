import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS, allowing requests from your React app's origin (port 5173)
  app.enableCors({
    origin: 'http://localhost:5173', // <--- Updated to your frontend port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  // Optional: Set a global API prefix if you want (e.g., '/api')
  // app.setGlobalPrefix('api');

await app.listen(process.env.PORT as string);
}
bootstrap();