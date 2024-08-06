import { Body, Controller, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PublicRoute } from "../common/decorators/admin.decorator";
import { AuthDto,ChangePDto } from "../user/dto";
import { GetCurrentUserId } from "../common/decorators";
import { Response,Request } from "express";
import { AtGuard } from "../common/guards";
import { CustomBody } from "../common/decorators/body.decorator";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @PublicRoute()
    @Post('login')
    login(@Body() dto:AuthDto, @Res({ passthrough: true }) res: Response,@Req() req: Request) {
        return this.authService.signinLocal(dto,res)
    }

    @PublicRoute()
    @UseGuards(AtGuard)
    @Post('logout')  
    logout(@GetCurrentUserId() userId: number, @Res({ passthrough: true }) res: Response): Promise<boolean> {
      console.log('userID',userId)
      return this.authService.logout(userId,res);
    }

    @PublicRoute()
    @UseGuards(AtGuard)
    @Put('change-password')
    changePassword(@GetCurrentUserId() userId: number, @Body() dto:ChangePDto, @Res({ passthrough: true }) res: Response){
      return this.authService.changePassword(userId,dto)
    }
}
