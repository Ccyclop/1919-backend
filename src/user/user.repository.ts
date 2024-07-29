import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDto } from "./dto";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcryptjs  from 'bcryptjs';

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(dto: CreateDto): Promise<UserEntity>{
        const password = await bcryptjs.hash(dto.password,10);
        const user = this.userRepository
            .create({
                name:dto.name,
                email: dto.email,
                password,
              })
        return await this.userRepository.save(user)
    }

      async findById(id: number): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne(
            { where: { id: id } }
        );
      }

      async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.createQueryBuilder('user')
          .select(['user.id', 'user.first_name', 'user.email','user.role']) 
          .getMany();
      }
    
      async findByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({where:{ email }});
      }
    
      async updateUser(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
      }

      async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
      }

      async findUserById(id: number): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { id, deleted_at: null } });
      }
    
      async softDeleteUser(id: number): Promise<void> {
        const deletedUser = await this.userRepository.softDelete(id); 
      }
    
}