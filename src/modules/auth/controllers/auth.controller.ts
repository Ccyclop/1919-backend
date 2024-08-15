import { Body, Controller, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { PublicRoute } from "../decorators/admin.decorator";
import { AuthDto,ChangePDto } from "../../user/dto";
import { GetCurrentUserId } from "../decorators";
import { Response,Request } from "express";
import { CustomBody } from "../decorators/body.decorator";
import { Roles } from "@src/modules/auth/decorators/role.decorator";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @PublicRoute()
    @Post('login')
    async login(@CustomBody() dto:AuthDto, @Res({ passthrough: true }) res: Response,@Req() req: Request) {
        return await this.authService.signinLocal(dto,res)
    }

    @Post('logout')  
    async logout(@GetCurrentUserId() userId: number, @Res({ passthrough: true }) res: Response): Promise<boolean> {
      console.log('userID',userId)
      return await this.authService.logout(userId,res);
    }

    // @Roles('admin')
    @Put('change-password')
    async changePassword(@GetCurrentUserId() userId: number, @Body() dto:ChangePDto, @Res({ passthrough: true }) res: Response){
      return await this.authService.changePassword(userId,dto)
    }
}
