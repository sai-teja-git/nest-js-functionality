import { Test, TestingModule } from '@nestjs/testing';
import { FileOperationController } from './file-operation.controller';
import { FileOperationService } from './file-operation.service';

describe('FileOperationController', () => {
  let controller: FileOperationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileOperationController],
      providers: [FileOperationService],
    }).compile();

    controller = module.get<FileOperationController>(FileOperationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
