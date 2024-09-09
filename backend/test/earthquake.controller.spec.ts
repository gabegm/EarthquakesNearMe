import { Test, TestingModule } from '@nestjs/testing';
import { EarthquakeController } from '../src/earthquake.controller';
import { EarthquakeService } from '../src/earthquake.service';
import { of } from 'rxjs';

describe('EarthquakeController', () => {
  let controller: EarthquakeController;
  let service: EarthquakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarthquakeController],
      providers: [
        {
          provide: EarthquakeService,
          useValue: {
            getClosestEarthquakes: jest.fn().mockReturnValue(of([])),
          },
        },
      ],
    }).compile();

    controller = module.get<EarthquakeController>(EarthquakeController);
    service = module.get<EarthquakeService>(EarthquakeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getClosestEarthquakes with correct parameters', async () => {
    const lat = '34.0522';
    const lon = '-118.2437';
    const getClosestEarthquakesSpy = jest.spyOn(service, 'getClosestEarthquakes');
    await controller.getClosestEarthquakes(lat, lon);
    expect(getClosestEarthquakesSpy).toHaveBeenCalledWith(34.0522, -118.2437);
  });

  it('should return an array of earthquakes', async () => {
    const result = [{ title: 'M 4.5 | 100km S of City', distance: 100, coordinates: [100, 0] }];
    jest.spyOn(service, 'getClosestEarthquakes').mockResolvedValue(result);
    expect(await controller.getClosestEarthquakes('34.0522', '-118.2437')).toBe(result);
  });
});
