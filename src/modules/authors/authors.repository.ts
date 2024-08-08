import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "./entities/author.entity";
import { Repository } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorRepository {

    constructor(@InjectRepository(Author)
                private readonly authorRepo: Repository<Author>) {}

    async create(data: CreateAuthorDto) {
        const newAuthor =  this.authorRepo.create(data)
        return await this.authorRepo.save(newAuthor)
    }

    async findAll() {
        return await this.authorRepo
                    .createQueryBuilder('author')
                    .leftJoinAndSelect('author.musics', 'music')
                    .getMany()
    }

    async findOne(id: number) {
        return await this.authorRepo
                    .createQueryBuilder('author')
                    .where('author.id = :id', { id })
                    .leftJoinAndSelect('author.musics', 'music')
                    .getOne()
    }

    async update(id: number, data: UpdateAuthorDto) {
        await this.authorRepo
                .createQueryBuilder('author')
                .update()
                .set(data)
                .where('author.id = :id', { id })
                .execute()

        return this.authorRepo
                .createQueryBuilder('author')
                .where('author.id = :id', { id })
                .leftJoinAndSelect('author.musics', 'music')
                .getOne()
    }

    async remove(id: number) {
        await this.authorRepo.softDelete(id)
        
        return this.authorRepo
                .createQueryBuilder('author')
                .withDeleted()
                .where('author.id = :id', {id})
                .leftJoinAndSelect('author.musics', 'music')
                .getOne()
    }

    async searchAuthors(searchString: string): Promise<Author[]> {
        const lowerCaseSearchString = `%${String(searchString).toLowerCase()}%`;
        return await this.authorRepo.createQueryBuilder('author')
          .where('LOWER(author.firstName) LIKE :searchString', { searchString: lowerCaseSearchString })
          .getMany();
      }



}