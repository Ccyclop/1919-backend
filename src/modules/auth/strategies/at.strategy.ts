import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@src/modules/auth/types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
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