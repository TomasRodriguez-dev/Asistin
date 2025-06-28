import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        const { message, token, ...rest } = data ?? {};
        const response: any = {
          success: true,
          message: message ?? 'Operación exitosa',
        };

        if (token !== undefined) {
          response.token = token;
        }

        if (Object.keys(rest).length > 0) {
          response.result = rest;
        }

        return response;
      }),
    );
  }
}