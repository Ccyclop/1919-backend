import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';


@Module({

  imports: [
    TypeOrmModule.forFeature([UserEntity]),

  ],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserRepository,UserService]
})
export class UserModule {}
