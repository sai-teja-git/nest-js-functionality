import { PartialType } from '@nestjs/mapped-types';
import { CreateFileOperationDto } from './create-file-operation.dto';

export class UpdateFileOperationDto extends PartialType(CreateFileOperationDto) {}
