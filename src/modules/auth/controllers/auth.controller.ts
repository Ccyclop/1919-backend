import { Body, Controller, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { PublicRoute } from "../decorators/admin.decorator";
import { AuthDto,ChangePDto } from "../../user/dtos";
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
    async login(@CustomBody() dto:AuthDto): Promise<Object> {
        return await this.authService.signinLocal(dto)
    }

    @PublicRoute()
    @Post('admin/login')
    async loginAdmin(@CustomBody() dto:AuthDto): Promise<Object> {
        return await this.authService.signinAdmin(dto)
    }
    

    @Put('logout')  
    async logout(@GetCurrentUserId() userId: number, @Res({ passthrough: true }) res: Response): Promise<boolean> {
      console.log('userID',userId)
      return await this.authService.logout(userId,res);
    }

    @Roles('admin')
    @Put('admin/logout')  
    async logoutAdmin(@GetCurrentUserId() userId: number, @Res({ passthrough: true }) res: Response): Promise<boolean> {
      console.log('userID',userId)
      return await this.authService.logout(userId,res);
    }

    @Roles('admin')
    @Put('block/:id')
    async blockUser(@Param('id') id:number): Promise<String> {
      return await this.authService.blockUser(id);
    }

    @Roles('admin')
    @Put('change-password/:id')
    async changePassword(
      @Param('id') id:number,@GetCurrentUserId() userId: number,
      @Body() dto:ChangePDto, @Res({ passthrough: true }) res: Response): Promise<boolean> {
        return await this.authService.changePassword(id,userId,dto)
    }
}
