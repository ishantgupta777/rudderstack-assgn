import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus() || 500;
    const message = exception.message || HttpStatus.INTERNAL_SERVER_ERROR;
    const path = request.url;
    const timestamp = new Date().toISOString();
    const trace = exception.stack;

    // !TODO - Add filename and lineNumber to the logs
    this.logger.error(message, [statusCode, path, timestamp, request.body]);
    this.logger.error(trace);

    response.status(statusCode).json({
      statusCode,
      timestamp,
      path,
      message,
    });
  }
}
