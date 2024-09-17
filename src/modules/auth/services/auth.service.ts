import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthDto,ChangePDto } from "../../user/dtos";
import { UserRepository } from "../../user/user.repository";
import * as bcryptjs from 'bcryptjs'
import { TokenService } from "./token.service";
import { Response } from "express";
import * as session from 'express-session';
import { UserRole } from "../types/role.type";
import { User } from "@src/modules/user/entity/user.entity";


@Injectable()
export class AuthService {
    constructor( 
        private readonly userRepository : UserRepository,
        private readonly tokenService : TokenService
    ) {}
            
    async signinLocal(dto: AuthDto){
        const user = await this.userRepository.findByEmail(dto.email);

        if (!user || user.blocked) throw new ForbiddenException('access denied');

        const passwordMatches = await bcryptjs.compare(dto.password,user.hashP);
        if (!passwordMatches) throw new ForbiddenException('access denied');

        if(user.role === 'admin' ){
          user.role = UserRole.admin;
        } else{
          user.role = UserRole.user;
        }
        
        await this.userRepository.updateUser(user)
     
        const refreshTokenExpiresIn = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        const accessTokenExpiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
 

        const tokens = await this.tokenService.getTokens(user.id, user.email);
        await this.tokenService.saveToken(user.id, tokens.refresh_token,refreshTokenExpiresIn);

        return { access_token: tokens.access_token, refresh_token:tokens.refresh_token, role: user.role };
    }

    async signinAdmin(dto: AuthDto){
      const user = await this.userRepository.findByEmail(dto.email);

      if (!user) throw new ForbiddenException('access denied');

      if(user.role !== 'admin' ) throw new UnauthorizedException('admin role required')

      const passwordMatches = await bcryptjs.compare(dto.password,user.hashP);
      if (!passwordMatches) throw new ForbiddenException('access denied');

      await this.userRepository.updateUser(user)
   
      const refreshTokenExpiresIn = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      const accessTokenExpiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

      const tokens = await this.tokenService.getTokens(user.id, user.email);
      await this.tokenService.saveToken(user.id, tokens.refresh_token,refreshTokenExpiresIn);

      return { access_token: tokens.access_token, refresh_token:tokens.refresh_token, role: user.role };
  }
        
      async logout(userId: number, res:Response): Promise<boolean> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
          throw new Error(`user with id${userId} not found`);
        }

        user.hashedRt = null; 

        if(user.role === 'user') {
          user.role = UserRole.guest
        }

        await this.userRepository.updateUser(user);

        return true;
        
      }

      async blockUser(id:number):Promise<String> {
        const user = await this.userRepository.findById(id)
        if (!user) throw new NotFoundException(`user with id ${id} not found `) 
        user.blocked = true
        await this.userRepository.updateUser(user)
        return 'user blocked'  
      }

      
      async changePassword( id:number,userId:number, dto:ChangePDto ): Promise<boolean>{
        const user = await this.userRepository.findById(id);
        if (!user) throw new ForbiddenException('access denied');

        // const matchPassword = await bcryptjs.compare(dto.oldPassword, user.hashP)
        // if(!matchPassword) throw new ForbiddenException('password is incorrect')

        const newPassword = await bcryptjs.hash(dto.newPassword,10)
        user.hashP = newPassword

        await this.userRepository.updateUser(user)

        return true 
      }

}
