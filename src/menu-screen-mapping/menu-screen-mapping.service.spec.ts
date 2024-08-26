import { Test, TestingModule } from '@nestjs/testing';
import { MenuScreenMappingService } from './menu-screen-mapping.service';

describe('MenuScreenMappingService', () => {
  let service: MenuScreenMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuScreenMappingService],
    }).compile();

    service = module.get<MenuScreenMappingService>(MenuScreenMappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
