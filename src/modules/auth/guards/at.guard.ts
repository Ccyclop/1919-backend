import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RequestInterface } from '../interfaces/request.interface';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(  private reflector: Reflector) {
   
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (user) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    console.log('User:', user);
    console.log('Error:', err);
    console.log('Info:', info);
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized!!!');
    }

    const request = context.switchToHttp().getRequest<RequestInterface>();
    request.user = user;
    return user;
  }
}