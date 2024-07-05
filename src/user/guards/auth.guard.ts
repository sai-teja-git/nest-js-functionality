import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EncryptionService } from 'src/services/encryption.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  encryptData(data: any) {
    return Buffer.from(JSON.stringify(data)).toString("base64")
  }

  decryptData(data: string) {
    return JSON.parse(Buffer.from(data, "base64") as any)
  }

  /**
   * The function `canActivate` in TypeScript checks for a valid authorization token in the request
   * headers and verifies it using JWT, setting the username and user in the request headers if
   * successful.
   * @param {ExecutionContext} context - The `context` parameter in the `canActivate` method represents
   * the execution context of a given request. It provides access to the current request and response
   * objects, among other things, allowing you to inspect and manipulate the incoming request.
   * @returns The `canActivate` function is returning a Promise that resolves to a boolean value. If
   * the function successfully verifies the JWT token and extracts the payload, it will return `true`.
   * Otherwise, if there is an error during the process, it will throw an `UnauthorizedException` with
   * the error message.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest()
      const token = request.headers.authorization
      if (!token) throw new HttpException("Access Denied", HttpStatus.FORBIDDEN);
      const jwt = token.split(" ")[1]
      const payload = this.jwtService.decode(jwt)
      if (!request.url.endsWith("/refresh-token")) {
        await this.jwtService.verifyAsync(jwt).catch(() => {
          throw new HttpException("Token Expired", HttpStatus.UNAUTHORIZED)
        })
        if (!payload) throw new HttpException("Token Expired", HttpStatus.UNAUTHORIZED)
      }
      if (payload["ttl"] < new Date().getTime()) {
        throw new HttpException("Session Expired", 440)
      }
      request['headers']['username'] = payload['username']
      request['headers']['user'] = payload['user']
      request['headers']['token_ttl'] = payload['ttl']
      return true
    } catch (err) {
      throw new HttpException(err.message, err.status ?? 500)
    }
  }
}
