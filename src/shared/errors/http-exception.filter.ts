import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './app-error';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      return res.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        code: exception.code,
        message: exception.message,
        details: exception.details ?? [],
      });
    }

    // Erros HTTP do Nest (ex: validação do ValidationPipe)
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse() as any;

      // O ValidationPipe costuma retornar { message: [...], error, statusCode }
      const details = response?.message ?? [];

      const code =
        statusCode === HttpStatus.BAD_REQUEST ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR';

      return res.status(statusCode).json({
        statusCode,
        code,
        message: typeof response === 'string' ? response : response?.error ?? 'Error',
        details,
      });
    }

    // Fallback
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      details: [],
    });
  }
}
