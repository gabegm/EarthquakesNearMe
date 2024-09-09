import { Controller, Get, Query } from '@nestjs/common';
import { EarthquakeService } from './earthquake.service';

@Controller('earthquakes')
export class EarthquakeController {
  constructor(private readonly earthquakeService: EarthquakeService) {}

  @Get('closest')
  async getClosestEarthquakes(@Query('lat') lat: string, @Query('lon') lon: string) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    return this.earthquakeService.getClosestEarthquakes(latitude, longitude);
  }
}
