import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MENU_SCREEN_MAPPING_TABLE, MenuScreenMappingModel } from './schemas/menu-screen-mapping';
import { HelperFunctionsService } from 'src/services/helper-functions.service';
import { products } from './constants/products.const';

@Injectable()
export class MenuScreenMappingService {

  constructor(
    @InjectModel(MENU_SCREEN_MAPPING_TABLE)
    private menuScreenMapping: Model<MenuScreenMappingModel>,

    private readonly helperFunctionsService: HelperFunctionsService
  ) { }

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
    const menuData = await this.menuScreenMapping.find().exec();
    const data: any = [{
      "_id": (Math.random() + 1).toString(16).substring(2),
      "name": "Static Menu",
      "path": "/pages/static",
      "static": true,
    }]
    for (let item of menuData) {
      const path = item.name.split(" ").map(e => e.toLowerCase()).join("-")
      data.push({
        "_id": item._id,
        "name": item.name,
        path: `/pages/view/${path}`,
        "static": false,
      })
    }
    try {
      return {
        data,
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

  async getMonthGraph() {
    try {
      const axis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", "Sep", "Oct", "Nov", "Dec"];
      let data = [];
      for (let category of axis) {
        data.push({
          category,
          value: this.helperFunctionsService.generateRandom(50, 500)
        })
      }
      return {
        data,
        status: HttpStatus.OK,
        message: "Menu Updated"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getTableData() {
    try {
      const data = [];
      for (let item of products) {
        let quantity = this.helperFunctionsService.generateRandom(0, 50)
        quantity = quantity < 5 ? 0 : quantity;
        data.push({
          ...item,
          quantity,
          inventoryStatus: (() => {
            if (quantity === 0) return "OUTOFSTOCK";
            if (quantity < 10) return "LOWSTOCK";
            return "INSTOCK";
          })()
        })
      }
      return {
        data,
        status: HttpStatus.OK,
        message: "Menu Updated"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async getKpiValue() {
    try {
      return {
        data: this.helperFunctionsService.generateRandom(10, 100),
        status: HttpStatus.OK,
        message: "Menu Updated"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

}
