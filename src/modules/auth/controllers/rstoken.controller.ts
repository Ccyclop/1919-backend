import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { RsTokenService } from "../services/RsToken.service";
import { PublicRoute } from "../decorators/admin.decorator";
import { GetCurrentUser } from "../decorators";
import { JwtPayloadWithRt } from "../types";
import { resetPDto } from "../dto/reset-password.dto";
import { RtGuard } from "../guards";
import { forgotPDto } from "../dto/forgotPassword.dto";
import { CustomBody } from "../decorators/body.decorator";
import { Roles } from "@src/modules/auth/decorators/role.decorator";

@Controller('resetToken')
export class RsTokenController {
    constructor(private rsTokenService: RsTokenService) {}

    
    @Post('forgot-password')
    async forgotPasswrod(@CustomBody() dto:forgotPDto){
      return await this.rsTokenService.forgotPassword(dto.email)
    }

    // @UseGuards(RtGuard)
    @Roles('user')
    @Put('reset-password/:resettoken')
    async resetPassword( @CustomBody() dto:resetPDto, @Param('resettoken') RsToken:string){
        console.log(RsToken)
        return await this.rsTokenService.resetPassword( RsToken,dto)
    }


}