import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EarthquakeModule } from '../src/earthquake.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EarthquakeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/earthquakes/closest (GET)', () => {
    return request(app.getHttpServer())
        .get('/earthquakes/closest')
        .query({ lat: '34.0522', lon: '-118.2437' }) // Example coordinates for Los Angeles
        .expect(200)
        .expect((response) => {
          // Add your assertions here
          expect(response.body).toBeInstanceOf(Array);
          // Add more specific assertions based on your expected response
        });
  });
});
