import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from './encryption.service';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
    private readonly logger = new Logger(HttpInterceptor.name);

    constructor(
        private encryptionService: EncryptionService
    ) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const http = context.switchToHttp()
        const request = http.getRequest()
        if (!request.url.endsWith("/login")) {
            if (request.body.data) {
                request.body = this.encryptionService.decryptData(request.body.data)
            }
        }
        return next.handle().pipe(
            map(data => {
                if (data.data) {
                    if (!request.url.endsWith("/login")) {
                        data.data = this.encryptionService.encryptData(data.data)
                    }
                }
                return data;
            }),
        );
    }
}