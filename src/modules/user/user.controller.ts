import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto';
import { Response } from 'express';
import { PublicRoute } from '../auth/decorators/admin.decorator';
import { User } from "./entity/user.entity";
import { CustomBody } from '../auth/decorators/body.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { ChangePasswrodDto } from './dto/change-passwrod.dto';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @PublicRoute()
    @Post('signup')
    signUp(@CustomBody() dto:CreateDto, @Res({ passthrough: true }) res: Response) {
      return this.userService.signupLocal(dto,res) 
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User> {
      const user = await this.userService.getUserById(id);
      return user;
    }

    @Get()
    async GetAll(): Promise<User[]> {
      return await this.userService.GetAll();
    }

    @Roles('admin')
    @Put(':id')
    async update(@Param('id') id: number, @CustomBody() dto: ChangePasswrodDto) {
      return this.userService.changePassword(id, dto);
    }

    @Roles('admin')
    @Delete(':id')
    DeleteUser(@Param('id') userId : number) {
      return this.userService.deleteUser(userId)
    }

}
