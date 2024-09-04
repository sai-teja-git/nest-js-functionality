import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MenuScreenMappingService } from './menu-screen-mapping.service';

@Controller('menu-screen-mapping')
export class MenuScreenMappingController {
  constructor(private readonly menuScreenMappingService: MenuScreenMappingService) { }

  @Post()
  insertMenuScreen(@Body() body) {
    return this.menuScreenMappingService.insertMenuScreen(body)
  }

  @Patch(":id")
  updateMenuScreen(@Param() object, @Body() body) {
    return this.menuScreenMappingService.updateMenu(object.id, body)
  }

  @Get("graph-data")
  getMonthGraph(@Param() object) {
    return this.menuScreenMappingService.getMonthGraph()
  }

  @Get("table-data")
  getTableData() {
    return this.menuScreenMappingService.getTableData()
  }

  @Get("kpi-value")
  getKpiValue() {
    return this.menuScreenMappingService.getKpiValue()
  }

  @Get(":id")
  getMenuScreenById(@Param() object) {
    return this.menuScreenMappingService.getMenuById(object.id)
  }

  @Get()
  getMenuScreens() {
    return this.menuScreenMappingService.getAllMenus()
  }

}
