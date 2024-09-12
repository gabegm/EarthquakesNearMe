import { Module } from '@nestjs/common';
import { EarthquakeController } from './earthquake.controller';
import { EarthquakeService } from './earthquake.service';

@Module({
  imports: [],
  controllers: [EarthquakeController],
  providers: [EarthquakeService],
})
export class EarthquakeModule {}
