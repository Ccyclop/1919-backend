import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { RsTokenService } from "./RsToken.service";
import { PublicRoute } from "../common/decorators/admin.decorator";
import { GetCurrentUser } from "../common/decorators";
import { JwtPayloadWithRt } from "../token/types";
import { resetPDto } from "./dtos/reset-password.dto";
import { RtGuard } from "../common/guards";
import { forgotPDto } from "./dtos/forgotPassword.dto";
import { CustomBody } from "../common/decorators/body.decorator";

@Controller('resetToken')
export class RsTokenController {
    constructor(private rsTokenService: RsTokenService) {}


    @PublicRoute()
    @Post('forgot-password')
    forgotPasswrod(@CustomBody() dto:forgotPDto){
      return this.rsTokenService.forgotPassword(dto.email)
    }

    @PublicRoute()
    @UseGuards(RtGuard)
    // @RoleGuard(['user', 'admin'])
    @Put('reset-password/:resettoken')
    resetPassword( @CustomBody() dto:resetPDto, @Param('resettoken') RsToken:string){
        console.log(RsToken)
        return this.rsTokenService.resetPassword( RsToken,dto)
    }


}