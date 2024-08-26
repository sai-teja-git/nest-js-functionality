import { Test, TestingModule } from '@nestjs/testing';
import { MenuScreenMappingController } from './menu-screen-mapping.controller';
import { MenuScreenMappingService } from './menu-screen-mapping.service';

describe('MenuScreenMappingController', () => {
  let controller: MenuScreenMappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuScreenMappingController],
      providers: [MenuScreenMappingService],
    }).compile();

    controller = module.get<MenuScreenMappingController>(MenuScreenMappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
