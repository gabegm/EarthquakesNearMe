export declare class EarthquakeService {
    private readonly apiUrl;
    getClosestEarthquakes(latitude: number, longitude: number): Promise<any[]>;
    private calculateDistance;
}
