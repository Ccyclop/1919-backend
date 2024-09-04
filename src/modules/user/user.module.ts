import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Token } from '../auth/entity/token.entity';
import { UserRepository } from './user.repository';
import { ResetToken } from '../auth/entity/reset-token.entity';
import { AuthModule } from '../auth/auth.module';
import { TokenRepository } from '../auth/repositories/token.repository';
import { TokenService } from '../auth/services/token.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([User,Token,ResetToken]),
    forwardRef(() => AuthModule),

  ],
  controllers: [UserController],
  providers: [UserService,UserRepository,TokenRepository,TokenService],
  exports:[UserRepository,UserService]
})
export class UserModule {}
