import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let finalMessage = 'Error interno del servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        finalMessage = res;
      } else if (typeof res === 'object' && (res as any).message) {
        finalMessage = Array.isArray((res as any).message)
          ? (res as any).message[0]
          : (res as any).message;
      }
    } else {
      console.error('Unhandled error:', exception);
    }

    const errorResponse = {
      success: false,
      statusCode: status,
      message: finalMessage,
    };

    response.status(status).json(errorResponse);
  }
}