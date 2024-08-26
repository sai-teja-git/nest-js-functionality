import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuScreenMappingDto } from './create-menu-screen-mapping.dto';

export class UpdateMenuScreenMappingDto extends PartialType(CreateMenuScreenMappingDto) {}
