import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto';
import { Response } from 'express';
import { UserEntity } from './entity/user.entity';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    signUp(@Body() dto:CreateDto, @Res({ passthrough: true }) res: Response) {
      return this.userService.signup(dto,res) 
    }
    

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<UserEntity> {
      const user = await this.userService.getUserById(id);
      return user;
    }

    @Get()
    async GetAll(): Promise<UserEntity[]> {
      return await this.userService.GetAll();
    }

    @Delete(':id')
    DeleteUser(@Param('id') userId : number) {
      return this.userService.deleteUser(userId)
    }

}
