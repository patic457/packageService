import { Test, TestingModule } from '@nestjs/testing';
import { PackageofferingController } from './packageoffering.controller';
import { PackageofferingService } from './packageoffering.service';

describe('PackageofferingController', () => {
  let controller: PackageofferingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageofferingController],
      providers: [PackageofferingService],
    }).compile();

    controller = module.get<PackageofferingController>(PackageofferingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
