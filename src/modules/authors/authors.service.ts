import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './authors.repository';
import { S3Type } from '../S3/enum/S3.enum';
import { Author } from './entities/author.entity';
import { S3Service } from '../S3/S3.service';

@Injectable()
export class AuthorsService {

  constructor(
        private readonly authorRepo: AuthorRepository,
        private readonly s3Service : S3Service
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

  
  async getTopAuthorsForLastMonth() {
    const month = new Date();
    month.setMonth(month.getMonth() - 1);
    return await this.authorRepo.findTop10AuthorsByMusic(month)
  }

  async getTopAuthorsForLastWeek() {
    const month = new Date();
    month.setMonth(month.getDate() - 7);
    return await this.authorRepo.findTop10AuthorsByMusic(month)
  }

  async getTopAuthorsForLastDay() {
    const month = new Date();
    month.setMonth(month.getDate() - 1);
    return await this.authorRepo.findTop10AuthorsByMusic(month)
  }

  async remove(id: number) {
    return await this.authorRepo.remove(id)
  }
}
