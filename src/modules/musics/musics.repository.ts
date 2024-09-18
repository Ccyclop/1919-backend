import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MusicEntity } from "./entities/music.entity";
import { Repository } from "typeorm";
import { CreateMusicDto } from "./dtos/create-music.dto";
import { UpdateMusicDto } from "./dtos/update-music.dto";

@Injectable()
export class MusicsRepository{
    constructor(@InjectRepository(MusicEntity)
                private readonly musicRepo:Repository<MusicEntity>) {}

    async create(data: CreateMusicDto) {
        const music = this.musicRepo.create(data)
        return await this.musicRepo.save(music)
    }

    async save(music: MusicEntity) {
         return await this.musicRepo.save(music);
      
    }
   
    async findAll() {
        return await this.musicRepo
                .createQueryBuilder('mus')
                .leftJoinAndSelect('mus.author', 'author')
                .leftJoinAndSelect('mus.photo', 'photo')
                .leftJoinAndSelect('mus.audio', 'audio')
                .getMany()
    }

    async findOne(id: number){
        return await this.musicRepo
                .createQueryBuilder('mus')
                .where('mus.id = :id', { id })
                .leftJoinAndSelect('mus.author', 'author')
                .leftJoinAndSelect('mus.listens', 'listenCounter')
                .leftJoinAndSelect('mus.audio','audio')
                .leftJoinAndSelect('mus.photo','photoId')
                .leftJoinAndSelect('mus.favorites','favorites')
                .getOne()
    }

    async getTop10Music(date: Date) {
        return await this.musicRepo
          .createQueryBuilder('music')
          .leftJoinAndSelect('music.photo', 'photo')
          .leftJoinAndSelect('music.audio', 'audio')
          .leftJoinAndSelect('music.listens', 'listenCounter')
          .where('listenCounter.createdAt >= :date', { date })  
          .groupBy('music.id')
          .orderBy('COUNT(listenCounter.id)', 'DESC')
          .limit(10)
          .getMany();
    }


      async getTopCharts(): Promise<MusicEntity[]> {
        return await this.musicRepo
          .createQueryBuilder('music')
          .leftJoin('music.favorites', 'favorites')
          .leftJoinAndSelect('music.photo','photo')
          .leftJoinAndSelect('music.audio', 'audio')
          .addSelect(`((music.views * 0.7) + (COUNT(favorites.id) * 0.3) )`, 'score')
          .where('music.createdAt >= :date', { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }) 
          .groupBy('music.id')
          .orderBy('score', 'DESC')
          .limit(10)
          .getMany();
      }


      async recommendMusicByPlaylist(playlistId: number): Promise<MusicEntity[]> {
        const musicInPlaylist = await this.musicRepo
          .createQueryBuilder('music')
          .leftJoin('music.playlists', 'playlist')
          .leftJoinAndSelect('music.author', 'author') 
          .where('playlist.id = :playlistId', { playlistId })
          .getMany();
    

        const artistIds = musicInPlaylist.map((item) => item.author.id);
      
        if (artistIds.length === 0) {
          return await this.musicRepo
          .createQueryBuilder('music')
          .leftJoin('music.favorites', 'favorites')
          .leftJoinAndSelect('music.photo','photo')
          .leftJoinAndSelect('music.audio', 'audio')
          .addSelect( `((music.views * 0.6) + (COUNT(favorites.id) * 0.4))`,'score')
          .groupBy('music.id')
          .orderBy('score', 'DESC')
          .limit(10)
          .getMany();
        }
      
        return await this.musicRepo
            .createQueryBuilder('music')
            .leftJoin('music.favorites', 'favorites')
            .leftJoinAndSelect('music.photo', 'photo')
            .leftJoinAndSelect('music.audio', 'audio')
            .where('music.authorId IN (:...artistIds)', { artistIds })
            .orWhere('music.views > 3') 
            .addGroupBy('photo.id')
            .addGroupBy('audio.id')
            .orderBy('music.authorId IN (:...artistIds)', 'DESC') 
            .addOrderBy('music.views', 'DESC') 
            .limit(10) 
            .getMany();
        } 
      


    async saveMusics(musicDto: CreateMusicDto[]): Promise<MusicEntity[]> {
        
        const insertedMusics = await this.musicRepo.createQueryBuilder()
            .insert()
            .values(musicDto)
            .execute();
    
        const insertedIds = insertedMusics.identifiers.map(id => id.id);
    
        const savedMusics = await this.findMusicsByIds(insertedIds);
    
        return savedMusics;
    }

    async searchMusic(searchString: string): Promise<MusicEntity[]> {
        const lowerCaseSearchString = `%${String(searchString).toLowerCase()}%`;
        return await this.musicRepo.createQueryBuilder('music')
          .where('LOWER(music.name) LIKE :searchString', { searchString: lowerCaseSearchString })
          .getMany();
      }
    

    async findMusicsByIds(musicIds: number[]): Promise<MusicEntity[]> {
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
                .getOne()
    }

    async remove(id: number) {
        await this.musicRepo.softDelete(id)

        return this.musicRepo
                .createQueryBuilder('mus')
                .withDeleted()
                .where('mus.id = :id', {id})
                .leftJoinAndSelect('mus.author', 'author')
                .getOne()

    }
}