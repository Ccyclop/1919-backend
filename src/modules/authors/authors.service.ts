import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './authors.repository';
import { S3Type } from '../S3/enum/S3.enum';
import { Author } from './entities/author.entity';
import { S3Service } from '../S3/S3.service';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthorsService {

  constructor(
        private readonly authorRepo: AuthorRepository,
        private readonly s3Service : S3Service,
        private readonly userRepository: UserRepository
      ) {}

  async create(createAuthorDto: CreateAuthorDto, filename: string, data: Buffer, mimetype: string, type: S3Type, userId: number): Promise<Author> {
    const { firstName,lastName, biography } = createAuthorDto;
  
    const uploadResponse = await this.s3Service.saveS3(filename, data, mimetype, type, userId);
  
    const author = new Author();
    author.firstName = firstName;
    author.lastName = lastName
    author.biography = biography;
    author.photo = uploadResponse; 
  
    return await this.authorRepo.saveAuthor(author);
  }

  async findAll() {
    return await this.authorRepo.findAll()
  }

  async findAuthor(id: number) {
    return await this.authorRepo.findOne(id)
  }

  async updateArtist(id:number,updateAuthorDto: UpdateAuthorDto, filename?: string, data?: Buffer, mimetype?: string, type?: S3Type,userId?:number) {
    const { firstName,lastName, biography } = updateAuthorDto;


    const author = await this.authorRepo.findOne(id)
    if(!author) throw new NotFoundException(`author with id${id} not found`)
      
    if (data && mimetype && type) {
      const uploadResponse = await this.s3Service.saveS3(filename, data, mimetype, type,userId);
      author.photo = uploadResponse; 
    }

    author.firstName = firstName;
    author.lastName = lastName
    author.biography = biography;
  
    return await this.authorRepo.saveAuthor(author);
  }

  async getTopAuthors(userId:number) {
    const user = await this.userRepository.findById(userId)
    if(user.blocked === true) {
      throw new ForbiddenException('user is blocked')
    }

    return await this.authorRepo.findTop10AuthorsByMusic()
  }

  async remove(id: number) {
    return await this.authorRepo.remove(id)
  }
}
