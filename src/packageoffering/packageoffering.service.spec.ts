import { Test, TestingModule } from '@nestjs/testing';
import { PackageofferingService } from './packageoffering.service';

describe('PackageofferingService', () => {
  let service: PackageofferingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageofferingService],
    }).compile();

    service = module.get<PackageofferingService>(PackageofferingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
