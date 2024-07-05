import { Body, Controller, Post, Headers, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("login")
  userLogin(@Body() body) {
    return this.userService.login(body)
  }

  @Get("refresh-token")
  @UseGuards(AuthGuard)
  refreshToken(@Headers() headers, @Body() body) {
    return this.userService.refreshToken(headers, body)
  }

}
