import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "./entities/music.entity";
import { Repository } from "typeorm";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { Author } from "src/authors/entities/author.entity";

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


    async saveMusics(musicDto: CreateMusicDto[]): Promise<Music[]> {
        
        const insertedMusics = await this.musicRepo.createQueryBuilder()
            .insert()
            .values(musicDto)
            // .values(musicDto.map(dto => ({ ...dto, author: author }))) 
            .execute();
    
        const insertedIds = insertedMusics.identifiers.map(id => id.id);
    
        const savedMusics = await this.findMusicsByIds(insertedIds);
    
        return savedMusics;
    }

    async searchMusic(searchString: string): Promise<Music[]> {
        const lowerCaseSearchString = `%${String(searchString).toLowerCase()}%`;
        return await this.musicRepo.createQueryBuilder('music')
          .where('LOWER(music.name) LIKE :searchString', { searchString: lowerCaseSearchString })
          .getMany();
      }
    

    // async saveMusics(musicDto: CreateMusicDto[], author: Author) {
    //     const musics= await this.musicRepo.createQueryBuilder().insert().values(musicDto).execute()
    //     console.log(musics)

      
    //     return musics
    // }
        // const musics= await this.musicRepo.createQueryBuilder().insert().values(musicDto).execute()
          // const music = new Music();
        // music.name = musicDto.name;
        // music.author = author;
        // music.duration = musicDto.duration;
    
        // return await this.musicRepo.save(music);

    async findMusicsByIds(musicIds: number[]): Promise<Music[]> {
        const realMusics = await this.musicRepo
          .createQueryBuilder('music')
          .where('music.id IN (:...musicIds)', { musicIds })
          .getMany();
    
          return realMusics
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