import { Test, TestingModule } from '@nestjs/testing';
import { ValidLocationsService } from './valid-locations.service';

describe('ValidLocationsService', () => {
  let service: ValidLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidLocationsService],
    }).compile();

    service = module.get<ValidLocationsService>(ValidLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
