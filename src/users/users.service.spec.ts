import { Test, TestingModule } from '@nestjs/testing';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: UsersService,
        useFactory: () => ({
          findOneAsync: jest.fn<Promise<User>, []>(async () => null),
          createAsync :  jest.fn<Promise<User>, []>(async () => null)
        }),
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
