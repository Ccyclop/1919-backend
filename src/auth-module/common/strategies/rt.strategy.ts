import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadWithRt } from 'src/auth-module/token/types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['refresh_token']; 
        }
        console.log('Refresh Token:', token); 
        return token;
      },
      secretOrKey: configService.get<string>('jwtRT.secret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayloadWithRt): Promise<JwtPayloadWithRt> {
    console.log('In validate method:', payload); 
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not found in cookie');
    }
    return {
      ...payload,
      refreshToken,
    };
  }
}