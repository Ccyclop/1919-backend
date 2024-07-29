// import { Test, TestingModule } from '@nestjs/testing';
// import { ForbiddenException } from '@nestjs/common';
// import * as bcryptjs from 'bcryptjs';
// import { UserService } from './user.service';
// import { UserRepository } from './user.repository';
// import { TokenService } from '../token/token.service';
// import { CreateDto } from './dto';
// import { User } from './entity/user.entity';
// import { Response } from 'express';

// describe('UserService', () => {
//     let service: UserService;
//     let fakeUserRepository: Partial<UserRepository>;
//     let fakeTokenService: Partial<TokenService>;
  
//     beforeEach(async () => {
//       const users: User[] = [];
//       fakeUserRepository = {
//         findByEmail: (email: string) => {
//           const filteredUsers = users.filter(user => user.email === email);
//           return Promise.resolve(filteredUsers[0]);
//         },
//         createUser: (dto: CreateDto) => {
//           const user = {
//             id: Math.floor(Math.random() * 999999),
//             ...dto,
//           } as any;
//           users.push(user);
//           return Promise.resolve(user);
//         },
//         getAllUsers: () => Promise.resolve(users),
//         findById: (id: number) => Promise.resolve(users.find(user => user.id === id)),
//         softDeleteUser: (id: number) => {
//           const index = users.findIndex(user => user.id === id);
//           if (index !== -1) {
//             users.splice(index, 1);
//           }
//           return Promise.resolve();
//         }
//       };
  
//       fakeTokenService = {
//         getTokens: jest.fn().mockResolvedValue({
//           access_token: 'access_token',
//           refresh_token: 'refresh_token',
//         }),
//         saveToken: jest.fn().mockResolvedValue(undefined),
//       };
  
//       const module: TestingModule = await Test.createTestingModule({
//         providers: [
//           UserService,
//         { provide: UserRepository, 
//             useValue: fakeUserRepository 
//         },
//         { provide: TokenService, 
//             useValue: fakeTokenService
//         },
//         ],
//       }).compile();
  
//       service = module.get<UserService>(UserService);
//     });
  
//     it('should be defined', () => {
//       expect(service).toBeDefined();
//     });
  
//     it('should create a new user with a salted and hashed password', async () => {
//       const dto: CreateDto = {
//         email: 'test@example.com',
//         password: 'password',
//         first_name: 'John',
//         id: 1
//       };
  
//       const res = {
//         cookie: jest.fn(),
//       } as unknown as Response;

//       const hashedP = '$2a$10$L5HQHMLrwhS9k3ITMJumyOF7uX55885KeqAzKbZGhKNppJQKgXjbm';
//       jest.spyOn(bcryptjs, 'hash').mockResolvedValue(hashedP as never );
  
//       const user = await service.signupLocal(dto, res);
  
//       expect(user).toHaveProperty('access_token');
//       expect(fakeUserRepository.findByEmail).toHaveBeenCalledWith(dto.email);
//       expect(fakeUserRepository.createUser).toHaveBeenCalledWith({
//         ...dto,
//         password: hashedP,
//       });
//       expect(fakeTokenService.getTokens).toHaveBeenCalledWith(expect.any(Number), dto.email);
//       expect(res.cookie).toHaveBeenCalledWith('refresh_token', 'refresh_token', expect.any(Object));
//       expect(res.cookie).toHaveBeenCalledWith('access_token', 'access_token', expect.any(Object));
//     });
  
//     it('should throw an error if email is already used', async () => {
//       const dto: CreateDto = {
//         email: 'test@example.com',
//         password: 'password',
//         first_name: 'John',
//         id: 1
//       };
  
//       const res = {
//         cookie: jest.fn(),
//       } as unknown as Response;
  
//       await service.signupLocal(dto, res);
  
//       await expect(service.signupLocal(dto, res)).rejects.toThrow(ForbiddenException);
//     });
  
//     it('should get all users', async () => {
//       const users = await service.GetAll();
//       expect(users).toEqual([]);
//     });
  
//     it('should get a user by ID', async () => {
//       const dto: CreateDto = {
//         email: 'test@example.com',
//         password: 'password',
//         first_name: 'John',
//         id: 1
//       };
  
//       const res = {
//         cookie: jest.fn(),
//       } as unknown as Response;
  
//       await service.signupLocal(dto, res);
  
//       const user = await service.getUserById(1);
//       expect(user).toBeDefined();
//       expect(user.email).toBe('test@example.com');
//     });
  
//     it('should delete a user', async () => {
//       const dto: CreateDto = {
//         email: 'test@example.com',
//         password: 'password',
//         first_name: 'John',
//         id: 1
//       };
  
//       const res = {
//         cookie: jest.fn(),
//       } as unknown as Response;
  
//       await service.signupLocal(dto, res);
  
//       await service.deleteUser(1);
  
//       const user = await service.getUserById(1);
//       expect(user).toBeUndefined();
//     });
//   });