import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../src/auth/auth.module';
import { INestApplication } from '@nestjs/common';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/auth/login POST`, () => {
    return request(app.getHttpServer()).post('/auth/login').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
