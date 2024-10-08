import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "./entities/author.entity";
import { Repository } from "typeorm";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorRepository {

    constructor(@InjectRepository(Author)
                private readonly authorRepo: Repository<Author>) {}

    async saveAuthor(author: Author) {
        return await this.authorRepo.save(author)
    }


    async findAll() {
        return await this.authorRepo
                    .createQueryBuilder('author')
                    .leftJoinAndSelect('author.musics', 'music')
                    .leftJoinAndSelect('author.albums','album')
                    .leftJoinAndSelect('author.photo','photo')
                    .getMany()
    }

    async findOne(id: number) {
        return await this.authorRepo
                    .createQueryBuilder('author')
                    .where('author.id = :id', { id })
                    .leftJoinAndSelect('author.photo','photo')
                    .leftJoinAndSelect('author.musics', 'music')
                    .leftJoinAndSelect('music.photo', 'photoId')
                    .leftJoinAndSelect('music.audio', 'audio')
                    .getOne()
    }

    async getAuthorByName(name:string) {
        return await this.authorRepo
        .createQueryBuilder('author')
        .where('author.firstName = :name', {name})
        .getOne()
    }

    async findTop10AuthorsByMusic(): Promise<Author[]> {
        return this.authorRepo.createQueryBuilder('author')
          .leftJoinAndSelect('author.musics', 'music')
          .leftJoinAndSelect('author.photo', 'photo')
          .leftJoin('music.favorites', 'favorites')
          .addSelect('COUNT(favorites.id)','SCORE' )
          .groupBy('author.id')
          .orderBy('SCORE', 'DESC')
          .limit(10)
          .getMany();
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
          .leftJoinAndSelect('author.photo','photo')
          .where('LOWER(author.firstName) LIKE :searchString', { searchString: lowerCaseSearchString })
          .getMany();
      }



}