import { Test, TestingModule } from '@nestjs/testing';
import { ValidLocationsController } from './valid-locations.controller';

describe('ValidLocationsController', () => {
  let controller: ValidLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidLocationsController],
    }).compile();

    controller = module.get<ValidLocationsController>(ValidLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
