import { NestFactory } from '@nestjs/core';
import { EarthquakeModule } from './earthquake.module';

async function bootstrap() {
  const app = await NestFactory.create(EarthquakeModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
