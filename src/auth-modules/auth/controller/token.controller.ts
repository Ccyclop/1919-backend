import { Body, Controller, Get, Injectable, Post, Res, UseGuards } from "@nestjs/common";
import { TokenService } from "../service/token.service";
import { PublicRoute } from "../../common/decorators/admin.decorator";
import { RtGuard } from "../guards";
import { GetCurrentUser } from "../../common/decorators";
import { JwtPayloadWithRt } from "../types";
import { Response } from "express";
import { Roles } from "@src/auth-modules/common/decorators/role.decorator";

@Injectable()
@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Roles('user', 'admin')
    @UseGuards(RtGuard)
    @Post('refresh')
    refreshTokens( @GetCurrentUser() user: JwtPayloadWithRt, @Res({ passthrough: true }) res: Response) {
      // console.log('Current User:', user.sub); 
      return this.tokenService.refreshTokens(user.sub, user.refreshToken,res);
    }

    @Roles('user', 'admin')
    @Get()
    async getAllTokens() {
      return this.tokenService.AllTokens();
    }
  

    
}