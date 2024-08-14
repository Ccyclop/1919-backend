import { Body, Controller, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { PublicRoute } from "../../common/decorators/admin.decorator";
import { AuthDto,ChangePDto } from "../../user/dto";
import { GetCurrentUserId } from "../../common/decorators";
import { Response,Request } from "express";
import { CustomBody } from "../../common/decorators/body.decorator";
import { Roles } from "@src/auth-modules/common/decorators/role.decorator";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @PublicRoute()
    @Post('login')
    login(@CustomBody() dto:AuthDto, @Res({ passthrough: true }) res: Response,@Req() req: Request) {
        return this.authService.signinLocal(dto,res)
    }

    @Roles('user', 'admin')
    @Post('logout')  
    logout(@GetCurrentUserId() userId: number, @Res({ passthrough: true }) res: Response): Promise<boolean> {
      console.log('userID',userId)
      return this.authService.logout(userId,res);
    }

    @Roles('user', 'admin')
    @Put('change-password')
    changePassword(@GetCurrentUserId() userId: number, @Body() dto:ChangePDto, @Res({ passthrough: true }) res: Response){
      return this.authService.changePassword(userId,dto)
    }
}
