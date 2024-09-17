import { ForbiddenException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { CreateDto } from './dtos';
import { Response } from 'express';
import { UserRepository } from './user.repository';
import { TokenService } from '../auth/services/token.service';
import { User } from './entity/user.entity';
import { TokenRepository } from '../auth/repositories/token.repository';
import { UserRole } from '../auth/types/role.type';
import { ChangePasswrodDto } from './dtos/change-passwrod.dto';

@Injectable()
export class UserService {
  constructor(
        private tokenService : TokenService,
        private readonly userRepository : UserRepository,
        private tokenRepository : TokenRepository

    ) {}
    async signupLocal(dto: CreateDto, res:Response){

        const checkEmail = await this.userRepository.findByEmail(dto.email)

        if(checkEmail) throw new ForbiddenException('email is already used')

        const user = {
          ...dto,
          role: UserRole.user,
        };

        const createUser = await this.userRepository.createUser(user)


        const tokens = await this.tokenService.getTokens(createUser.id, createUser.email);

        const refreshTokenExpiresIn = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); 
        
        await this.tokenService.saveToken(user.id, tokens.refresh_token,refreshTokenExpiresIn);    

        
        return { access_token: tokens.access_token,refresh_token: tokens.refresh_token };
    }

    async changePassword(id:number,dto:ChangePasswrodDto) {
      return await this.userRepository.changePassword(id,dto)
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
        await this.tokenRepository.deleteTokensByUserId(id)
        await this.userRepository.softDeleteUser(id);
      }
      

      
}


