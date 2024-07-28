import { ForbiddenException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs  from 'bcryptjs';
import { CreateDto } from './dto';
import { Response } from 'express';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
        private readonly userRepository : UserRepository,

    ) {}
    async signupLocal(dto: CreateDto, res:Response){

        const checkEmail = await this.userRepository.findByEmail(dto.email)

        if(checkEmail) throw new ForbiddenException('email is already used')

        const user = await this.userRepository.createUser(dto)   

    }

      GetAll() {
        return this.userRepository.getAllUsers();
      }

      async getUserById(id: number): Promise<User> {
        return this.userRepository.findById(id);
      }

      async deleteUser(id: number): Promise<void> {
        const user  = await this.userRepository.findById(id)
        if(!user) throw new UnauthorizedException(`user wiht id ${id} not found`)
        await this.userRepository.softDeleteUser(id);
      }
      

      
}


