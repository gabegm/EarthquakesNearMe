import { Test, TestingModule } from '@nestjs/testing';
import { EarthquakeService } from '../src/earthquake.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('EarthquakeService', () => {
    let service: EarthquakeService;
    let mock: MockAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EarthquakeService],
        }).compile();

        service = module.get<EarthquakeService>(EarthquakeService);
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should return the top 10 nearest earthquakes with title, distance, and coordinates', async () => {
        const mockData = {
            features: [
                {
                    id: '1',
                    properties: { mag: 4.5, place: '100km S of City' },
                    geometry: { coordinates: [100, 0] },
                },
                // Add more mock earthquake data as needed
            ],
        };

        mock.onGet(service['apiUrl']).reply(200, mockData);

        const result = await service.getClosestEarthquakes(0, 0);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            title: 'M 4.5 | 100km S of City',
            distance: expect.any(Number),
            coordinates: [100, 0],
        });
    });

    it('should deduplicate earthquakes based on their IDs', async () => {
        const mockData = {
            features: [
                {
                    id: '1',
                    properties: { mag: 4.5, place: '100km S of City' },
                    geometry: { coordinates: [100, 0] },
                },
                {
                    id: '1',
                    properties: { mag: 4.5, place: '100km S of City' },
                    geometry: { coordinates: [100, 0] },
                },
            ],
        };

        mock.onGet(service['apiUrl']).reply(200, mockData);

        const result = await service.getClosestEarthquakes(0, 0);
        expect(result).toHaveLength(1);
    });
});
