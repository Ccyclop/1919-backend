import { Injectable, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtPayload } from '@src/modules/auth/types';
import { RequestInterface } from '../interfaces/request.interface';



@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (user) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user , info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized!!!');
    }

    const request = context.switchToHttp().getRequest<RequestInterface>();
    request.user = user;

    if (user.role !== 'user' && user.role !== 'admin') {
        throw new ForbiddenException('Unauthorized access - user or admin role required');
      }

    return user;
  }
}