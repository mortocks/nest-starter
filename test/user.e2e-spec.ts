import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { INestApplication } from '@nestjs/common';

describe('User', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
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
