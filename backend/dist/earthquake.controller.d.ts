import { EarthquakeService } from './earthquake.service';
export declare class EarthquakeController {
    private readonly earthquakeService;
    constructor(earthquakeService: EarthquakeService);
    getClosestEarthquakes(lat: string, lon: string): Promise<any[]>;
}
