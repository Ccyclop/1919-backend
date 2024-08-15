import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './authors.repository';

@Injectable()
export class AuthorsService {

  constructor(private readonly authorRepo: AuthorRepository) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepo.create(createAuthorDto)
  }

  async findAll() {
    return await this.authorRepo.findAll()
  }

  async findOne(id: number) {
    return await this.authorRepo.findOne(id)
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepo.update(id, updateAuthorDto)
  }

  async remove(id: number) {
    return await this.authorRepo.remove(id)
  }
}
