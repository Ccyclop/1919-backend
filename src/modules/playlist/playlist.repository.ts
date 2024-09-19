import { InjectRepository } from "@nestjs/typeorm";
import { playlistEntity } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { MusicEntity } from "../musics/entities/music.entity";


export class PlaylistRepository {
    constructor( 
        @InjectRepository(playlistEntity)
        private readonly playlistRepo : Repository<playlistEntity>

    ) {}

    async createPlaylist(name: string, musics: MusicEntity[]): Promise<playlistEntity> {
        const playlist = this.playlistRepo.create({
          name,
          musics
        });
    
        return this.playlistRepo.save(playlist);
      }

      async getMusicsForPLaylist(playlistId: number): Promise<MusicEntity[]> {
        const album = await this.playlistRepo
          .createQueryBuilder('playlist')
          .leftJoinAndSelect('playlist.musics', 'music')
          .leftJoinAndSelect('music.photo', 'photo')
          .where('playlist.id = :playlistId', { playlistId })
          .getOne();
      
      
        return album.musics;
      }


    async getPlaylistById(id:number) {
        return this.playlistRepo.findOne({where: {id:id}, relations: ['musics','photo']});
    }

    async getPlaylist(id:number) {
      return await this.playlistRepo
          .createQueryBuilder('playlist')
          .leftJoinAndSelect('playlist.photo','photo')
          .leftJoinAndSelect('playlist.musics', 'music')
          .leftJoinAndSelect('music.photo', 'photoId')
          .where('playlist.id = :id', { id})
          .getOne();
    }

    async getPLaylistByName(name:string) {
        return await this.playlistRepo.find({where: {name}});
    }

    async getAllPlaylist(userId:number) {
        return this.playlistRepo
              .createQueryBuilder('playlist')
              .leftJoinAndSelect('playlist.photo','photo')
              .leftJoinAndSelect('playlist.musics', 'music')
              .leftJoin('playlist.user', 'user')
              .where('user.id =:userId',{userId})
              .getMany()


    }

    async savePlaylist(playlist:playlistEntity): Promise<playlistEntity> {
        return this.playlistRepo.save(playlist);
    }

    async addMusicToPlaylist(playlistId: number, music: MusicEntity): Promise<playlistEntity> {
        const playlist = await this.playlistRepo.findOne({where : {id:playlistId}, relations: ['musics'] });
        if (!playlist) {
          throw new Error('Playlist not found');
        }
        playlist.musics.push(music);
        return this.playlistRepo.save(playlist);
    }
    
    async removeMusicFromPlaylist(playlistId: number, musicId: number): Promise<playlistEntity> {
        const playlist = await this.playlistRepo.findOne({where: {id:playlistId}, relations: ['musics'] });
        if (!playlist) {
            throw new Error('Playlist not found');
        }
        playlist.musics = playlist.musics.filter(music => music.id !== musicId);
        return this.playlistRepo.save(playlist);
    }

    async deletePlaylist(id:number) {
        return this.playlistRepo.softDelete(id);
    }

    async searchPlaylists(searchString: string): Promise<playlistEntity[]> {
        const lowerCaseSearchString = `%${String(searchString).toLowerCase()}%`;
        return await this.playlistRepo.createQueryBuilder('playlist')
          .leftJoinAndSelect('playlist.photo','photo')
          .where('LOWER(playlist.name) LIKE :searchString', { searchString: lowerCaseSearchString })
          .getMany();
      }


}