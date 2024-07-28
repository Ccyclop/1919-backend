import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';


@Module({

  imports: [
    TypeOrmModule.forFeature([User]),

  ],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserRepository,UserService]
})
export class UserModule {}
