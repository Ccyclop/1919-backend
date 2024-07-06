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

    create(data: CreateMusicDto) {
        const music = this.musicRepo.create(data)
        return this.musicRepo.save(music)
    }

    findAll() {
        return this.musicRepo
                .createQueryBuilder('music')
                .getMany()
    }

    findOne(id: number){
        return this.musicRepo
                .createQueryBuilder('music')
                .where('music.id = :id', { id })
                .getOne()
    }

    async update(id: number, data: UpdateMusicDto) {
        await this.musicRepo
                .createQueryBuilder('music')
                .update()
                .set(data)
                .where('music.id = :id', { id })
                .execute()

        return this.musicRepo
                .createQueryBuilder('music')
                .where('music.id = :id', {id})
                .getOne()
    }

    async remove(id: number) {
        await this.musicRepo.softDelete(id)

        return this.musicRepo
                .createQueryBuilder('music')
                .withDeleted()
                .where('music.id = :id', {id})
                .getOne()

    }
}