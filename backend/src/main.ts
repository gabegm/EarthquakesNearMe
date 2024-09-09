import { NestFactory } from '@nestjs/core';
import { EarthquakeModule } from './earthquake.module';

async function bootstrap() {
  const app = await NestFactory.create(EarthquakeModule);
  await app.listen(3000);
}
bootstrap();
