import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { RsTokenService } from "../service/RsToken.service";
import { PublicRoute } from "../../common/decorators/admin.decorator";
import { GetCurrentUser } from "../../common/decorators";
import { JwtPayloadWithRt } from "../types";
import { resetPDto } from "../dto/reset-password.dto";
import { RtGuard } from "../guards";
import { forgotPDto } from "../dto/forgotPassword.dto";
import { CustomBody } from "../../common/decorators/body.decorator";
import { Roles } from "@src/auth-modules/common/decorators/role.decorator";

@Controller('resetToken')
export class RsTokenController {
    constructor(private rsTokenService: RsTokenService) {}

    
    @Roles('user', 'admin')
    @Post('forgot-password')
    forgotPasswrod(@CustomBody() dto:forgotPDto){
      return this.rsTokenService.forgotPassword(dto.email)
    }

    // @UseGuards(RtGuard)
    @Roles('user','admin')
    @Put('reset-password/:resettoken')
    resetPassword( @CustomBody() dto:resetPDto, @Param('resettoken') RsToken:string){
        console.log(RsToken)
        return this.rsTokenService.resetPassword( RsToken,dto)
    }


}