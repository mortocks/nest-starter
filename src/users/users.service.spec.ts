import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { randEmail, randFullName } from '@ngneat/falso';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const email = randEmail();
    const name = randFullName();
    const user = await service.createUser({ email, name });
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.name).toBe(name);
    expect(user.id).toBeDefined();
  });

  it('emails should be required', async () => {
    const name = randFullName();
    expect(service.createUser({ name, email: null })).rejects.toThrow();
  });

  it('emails should find a single user', async () => {
    const email = randEmail();
    const name = randFullName();
    const user = await service.createUser({ email, name });

    const found = await service.findOne({ id: user.id });
    expect(found).toBeDefined();
    expect(found.email).toBe(user.email);
  });

  it('should find many users', async () => {
    const user1 = await service.createUser({
      email: randEmail(),
      name: randFullName(),
    });

    const user2 = await service.createUser({
      email: randEmail(),
      name: randFullName(),
    });

    const users = await service.findMany({
      where: {
        OR: [
          {
            email: user1.email,
          },
          {
            email: user2.email,
          },
        ],
      },
    });

    expect(users.length).toBe(2);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email: user1.email }),
        expect.objectContaining({ email: user2.email }),
      ]),
    );
  });

  it('should find many users with skip', async () => {
    const user1 = await service.createUser({
      email: randEmail(),
      name: randFullName(),
    });

    const user2 = await service.createUser({
      email: randEmail(),
      name: randFullName(),
    });

    const users = await service.findMany({
      skip: 1,
      where: {
        OR: [
          {
            email: user1.email,
          },
          {
            email: user2.email,
          },
        ],
      },
    });

    expect(users.length).toBe(1);
    expect(users).toEqual(
      expect.arrayContaining([expect.objectContaining({ email: user2.email })]),
    );
  });

  it('should update user', async () => {
    const email = randEmail();
    const name = randFullName();
    let user = await service.createUser({ email, name });

    // Email update
    const newEmail = randEmail();
    user = await service.updateUser({ id: user.id }, { email: newEmail });
    expect(email).not.toEqual(newEmail);
    expect(user.email).toBe(newEmail);

    // name update
    const newName = randFullName();
    user = await service.updateUser({ id: user.id }, { name: newName });
    expect(name).not.toEqual(newName);
    expect(user.name).toBe(newName);
  });

  it('should delete user', async () => {
    const email = randEmail();
    const user = await service.createUser({ email, name: 'Delete me' });

    const deleted = await service.deleteUser({ id: user.id });
    expect(deleted).toBeDefined();
    expect(deleted.email).toEqual(user.email);

    const found = await service.findOne({ id: deleted.id });
    expect(found).toBeNull();
  });
});
