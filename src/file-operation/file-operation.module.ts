import { Module } from '@nestjs/common';
import { FileOperationService } from './file-operation.service';
import { FileOperationController } from './file-operation.controller';
import { JsonFileOperationService } from 'src/services/json-file-operation.service';

@Module({
  controllers: [FileOperationController],
  providers: [
    FileOperationService,
    JsonFileOperationService
  ],
})
export class FileOperationModule { }
