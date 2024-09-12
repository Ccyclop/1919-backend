import { Body, Controller, Get, Injectable, Post, Res, UseGuards } from "@nestjs/common";
import { TokenService } from "../services/token.service";
import { PublicRoute } from "../decorators/admin.decorator";
import { RtGuard } from "../guards";
import { GetCurrentUser } from "../decorators";
import { JwtPayloadWithRt } from "../types";
import { Response } from "express";
import { Roles } from "@src/modules/auth/decorators/role.decorator";

@Injectable()
@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @PublicRoute()
    @UseGuards(RtGuard)
    @Post('refresh')
    async refreshTokens( @GetCurrentUser() user: JwtPayloadWithRt) {
      return await this.tokenService.refreshTokens(user.sub, user.refreshToken);
    }

    @Roles('user')
    @Get()
    async getAllTokens() {
      return this.tokenService.AllTokens();
    }
  

    
}