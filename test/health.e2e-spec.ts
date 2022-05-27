import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HealthModule } from '../src/health/health.module';
import { INestApplication } from '@nestjs/common';

describe('Health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/health health check`, () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        status: 'ok',
        info: {
          'nestjs-docs': {
            status: 'up',
          },
        },
        error: {},
        details: {
          'nestjs-docs': {
            status: 'up',
          },
        },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
