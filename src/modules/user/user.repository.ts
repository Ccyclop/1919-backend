import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDto } from "./dto";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcryptjs  from 'bcryptjs';
import { UserRole } from "../auth/types/role.type";
import { ChangePasswrodDto } from "./dto/change-passwrod.dto";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(dto: CreateDto): Promise<User>{
        const hashP = await bcryptjs.hash(dto.password,10);
        const hashedRt= ''
        const user = this.userRepository
            .create({
                first_name:dto.first_name,
                email: dto.email,
                hashP,
                hashedRt,
                role: UserRole.user
              })
        return await this.userRepository.save(user)
    }

      async findOneWithRelationsToken(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne({
          where: { id },
          relations: ['tokens'],
        });
      }

      async findOneWithRelationRsToken(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
          where: { email },
          relations: ['resetTokens'],
        });
      }
     
    
      async findById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne(
            { 
              where: { id: id },
              relations: ['favorites']
           }
        );
      }

      async changePassword(id:number,dto:ChangePasswrodDto) {
        const user = await this.userRepository.findOne({where:{id}});
        const newPassword = await bcryptjs.hash(dto.newPassword,10);
        user.hashP = newPassword;
        return await this.userRepository.save(user);
      }

      async getAllUsers(): Promise<User[]> {
        return await this.userRepository.createQueryBuilder('user')
          .select(['user.id', 'user.first_name', 'user.email','user.role']) 
          .getMany();
      }
    
      async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({where:{ email }});
      }
    
      async updateUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
      }

      async findAll(): Promise<User[]> {
        return await this.userRepository.find();
      }

      async findUserById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id, deleted_at: null } });
      }
    
      async softDeleteUser(id: number): Promise<void> {
        const deletedUser = await this.userRepository.softDelete(id); 
      }
    
}