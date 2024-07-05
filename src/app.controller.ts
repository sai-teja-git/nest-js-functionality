import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello() {
    return { status: HttpStatus.OK, message: `Hi server Here` };
  }
}
