import {Injectable} from '@nestjs/common';
import axios from 'axios'; // Needed for HTTP requests

@Injectable()
export class EarthquakeService {
    private readonly apiUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

    async getClosestEarthquakes(latitude: number, longitude: number): Promise<any[]> {
        const response = await axios.get(this.apiUrl);
        const earthquakes = response.data.features;

        // Create a Set to store unique earthquake IDs
        const uniqueEarthquakeIds = new Set();

        // Calculate distance, filter unique earthquakes, and sort by nearest
        const sortedEarthquakes = earthquakes
            .filter((quake: any) => {
                const isUnique = !uniqueEarthquakeIds.has(quake.id);
                uniqueEarthquakeIds.add(quake.id);
                return isUnique;
            })
            .map((quake: any) => {
                const distance = this.calculateDistance(latitude, longitude, quake.geometry.coordinates[1], quake.geometry.coordinates[0]);
                const title = `M ${quake.properties.mag} | ${quake.properties.place}`;
                const coordinates = quake.geometry.coordinates;

                return {title, distance, coordinates};
            })
            .sort((a: any, b: any) => a.distance - b.distance);

        // Return top 10 nearest earthquakes
        return sortedEarthquakes.slice(0, 10);
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRad = (value: number) => value * Math.PI / 180;
        const R = 6371; // Radius of the Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return Math.round(distance); // Round the distance to the nearest integer
    }
}
