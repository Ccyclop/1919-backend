import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@src/modules/auth/types';
import { Response,Request } from 'express';
import { TokenService } from '../services/token.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService,
    private tokenService: TokenService, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwtSTR.secret'),
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Validate Payload:', payload); 
    const { sub, email, role } = payload;
    
    if (!sub || !email) {
      throw new ForbiddenException('Invalid token payload');
    }
    return { sub, email, role };
  }

 
}