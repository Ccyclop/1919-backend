import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadWithRt } from '@src/modules/auth/types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwtSTR.secret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayloadWithRt): Promise<JwtPayloadWithRt> {
    console.log('In validate method:', payload);

    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not found in Authorization header');
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}