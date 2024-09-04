import { Module } from '@nestjs/common';
import { MenuScreenMappingService } from './menu-screen-mapping.service';
import { MenuScreenMappingController } from './menu-screen-mapping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MENU_SCREEN_MAPPING_TABLE, MenuScreenMappingSchema } from './schemas/menu-screen-mapping';
import { HelperFunctionsService } from 'src/services/helper-functions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MENU_SCREEN_MAPPING_TABLE,
        schema: MenuScreenMappingSchema
      }
    ])
  ],
  controllers: [MenuScreenMappingController],
  providers: [
    MenuScreenMappingService,
    HelperFunctionsService
  ],
})
export class MenuScreenMappingModule { }
