import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Token } from '../auth/entity/token.entity';
import { EmailService } from '../auth/service/email.service';
import { UserRepository } from './user.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { ResetToken } from '../auth/entity/reset-token.entity';
import { AuthModule } from '../auth/auth.module';
import { TokenRepository } from '../auth/repository/token.repository';
import { TokenService } from '../auth/service/token.service';

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
