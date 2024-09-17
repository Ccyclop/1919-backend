import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { RsTokenService } from "../services/RsToken.service";
import { resetPDto } from "../dtos/reset-password.dto";
import { forgotPDto } from "../dtos/forgotPassword.dto";
import { CustomBody } from "../decorators/body.decorator";

@Controller('resetToken')
export class RsTokenController {
    constructor(private rsTokenService: RsTokenService) {}


    @Post('forgot-password')
    async forgotPasswrod(@CustomBody() dto:forgotPDto): Promise<String>{
      return await this.rsTokenService.forgotPassword(dto.email)
    }

    @Put('reset-password/:resettoken')
    async resetPassword( @CustomBody() dto:resetPDto, @Param('resettoken') RsToken:string): Promise<String>{
        return await this.rsTokenService.resetPassword( RsToken,dto)
    }


}