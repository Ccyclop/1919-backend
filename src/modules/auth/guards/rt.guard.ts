import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestInterface } from '../interfaces/request.interface';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    console.log('Guard Error:', err); 

    if (err || !user) {
      throw err || new UnauthorizedException('error!!!');
    }
    
    const request = context.switchToHttp().getRequest<RequestInterface>();
    request.user = user;
    console.log('Guard User:', user); 

    return user;
  }
}


