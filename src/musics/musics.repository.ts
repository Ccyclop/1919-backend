import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "./entities/music.entity";
import { Repository } from "typeorm";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";

@Injectable()
export class MusicsRepository{
    constructor(@InjectRepository(Music)
                private readonly musicRepo:Repository<Music>) {}

    async create(data: CreateMusicDto) {
        const music = this.musicRepo.create(data)
        return await this.musicRepo.save(music)
    }

    async findAll() {
        return await this.musicRepo
                .createQueryBuilder('mus')
                .leftJoinAndSelect('mus.author', 'author')
                .leftJoinAndSelect('author.musics', 'music')
                .getMany()
    }

    async findOne(id: number){
        return await this.musicRepo
                .createQueryBuilder('mus')
                .where('mus.id = :id', { id })
                .leftJoinAndSelect('mus.author', 'author')
                .leftJoinAndSelect('author.musics', 'music')
                .getOne()
    }

    async findMusicsByIds(musicIds: number[]): Promise<Music[]> {
        const musics = await this.musicRepo
          .createQueryBuilder('music')
          .where('music.id IN (:...musicIds)', { musicIds })
          .getMany();
    
          return musics
      }

    async update(id: number, data: UpdateMusicDto) {
        await this.musicRepo
                .createQueryBuilder('mus')
                .update()
                .set(data)
                .where('mus.id = :id', { id })
                .execute()

        return this.musicRepo
                .createQueryBuilder('mus')
                .where('mus.id = :id', {id})
                .leftJoinAndSelect('mus.author', 'author')
                .leftJoinAndSelect('author.musics', 'music')
                .getOne()
    }

    async remove(id: number) {
        await this.musicRepo.softDelete(id)

        return this.musicRepo
                .createQueryBuilder('mus')
                .withDeleted()
                .where('mus.id = :id', {id})
                .leftJoinAndSelect('mus.author', 'author')
                .leftJoinAndSelect('author.musics', 'music')
                .getOne()

    }
}