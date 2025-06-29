import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        const response: any = {
          success: true,
          message: data?.message ?? 'Operación exitosa',
        };

        if ('token' in data) {
          response.token = data.token;
        }

        if (Array.isArray(data)) {
          response.result = data;
        } else if (typeof data === 'object' && data !== null) {
          const { message, token, ...rest } = data;
          if (Object.keys(rest).length > 0) {
            response.result = rest;
          }
        }

        return response;
      }),
    );
  }
}