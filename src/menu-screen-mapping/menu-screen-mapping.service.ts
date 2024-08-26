import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MENU_SCREEN_MAPPING_TABLE, MenuScreenMappingModel } from './schemas/menu-screen-mapping';

@Injectable()
export class MenuScreenMappingService {

  @InjectModel(MENU_SCREEN_MAPPING_TABLE)
  private menuScreenMapping: Model<MenuScreenMappingModel>

  async insertMenuScreen(data: any) {
    try {
      await this.menuScreenMapping.insertMany(data)
      return {
        message: "Menu Created",
        status: HttpStatus.CREATED
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getAllMenus() {
    try {
      return {
        data: await this.menuScreenMapping.find().exec(),
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getMenuById(id: string) {
    try {
      return {
        data: await this.menuScreenMapping.findOne({ _id: id }).exec(),
        status: HttpStatus.OK
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async updateMenu(id, data: any) {
    try {
      await this.menuScreenMapping.updateOne({ _id: id }, data)
      return {
        status: HttpStatus.OK,
        message: "Menu Updated"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

}
