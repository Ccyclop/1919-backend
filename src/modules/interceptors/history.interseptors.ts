import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import { RequestHistoryService } from '../request-history/history.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly requestHistoryService: RequestHistoryService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;
  
      return next.handle().pipe(
        tap(async (response) => {
          const action = `${method} ${url}`;
          const details = `Response: ${JSON.stringify(response)}`;
          await this.requestHistoryService.logAction(action, details);
        }),
      );
    }
  }