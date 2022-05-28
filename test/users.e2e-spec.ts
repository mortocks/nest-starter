import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { randEmail, randFullName } from '@ngneat/falso';
import { INestApplication } from '@nestjs/common';

describe('User', () => {
  let app: INestApplication;
  const userService = {
    findMany: () => ['test'],
    findOne: () => ({
      name: 'Barry',
    }),
    deleteUser: () => ({ name: 'Deleted ' }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/users GET to return findMany`, async () => {
    const response = userService.findMany();
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(response);
  });

  it(`/users/1 GET to return findOne`, async () => {
    const response = userService.findOne();
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(response);
  });

  it(`/users/1 Delete to return deleteUser`, async () => {
    const response = userService.deleteUser();
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200)
      .expect(response);
  });

  afterAll(async () => {
    await app.close();
  });
});
