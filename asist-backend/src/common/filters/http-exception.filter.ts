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
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Error interno del servidor';

    let finalMessage = 'Ha ocurrido un error';

    if (typeof message === 'string') {
      finalMessage = message;
    } else if (typeof message === 'object' && (message as any).message) {
      finalMessage = Array.isArray((message as any).message)
        ? (message as any).message[0]
        : (message as any).message;
    }

    const errorResponse: any = {
      success: false,
      message: finalMessage,
    };

    // Solo incluye "result" si realmente hay contenido útil
    if ((message as any)?.result) {
      errorResponse.result = (message as any).result;
    }

    response.status(status).json(errorResponse);
  }
}