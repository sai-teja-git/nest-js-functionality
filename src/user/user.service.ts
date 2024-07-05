import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class UserService {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  private getToken(username: string, ttl: number | undefined = undefined) {
    return this.jwtService.sign({
      user: username,
      username: "User Full Name",
      // ttl: ttl ?? new Date().setMinutes(new Date().getMinutes() + 2)
      ttl: ttl ?? new Date().setSeconds(new Date().getSeconds() + 20)
    })
  }

  async login(body: any) {
    try {
      const token = this.getToken(body["username"])

      return {
        message: "Success",
        status: HttpStatus.OK,
        data: {
          token,
          name: "User Full Name",
        }
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async refreshToken(headers: any, body: any) {
    try {
      // throw new HttpException("Session Expired", 440)
      if (body.count > 5) {
        throw new HttpException("Session Expired", 440)
      }
      const token = this.getToken(headers.user, headers.token_ttl)
      return {
        message: "Success",
        status: HttpStatus.OK,
        data: {
          token,
        }
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

}
