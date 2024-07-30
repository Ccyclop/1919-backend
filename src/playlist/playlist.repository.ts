import { InjectRepository } from "@nestjs/typeorm";
import { playlistEntity } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { Music } from "src/musics/entities/music.entity";


export class PlaylistRepository {
    constructor( 
        @InjectRepository(playlistEntity)
        private readonly playlistRepo : Repository<playlistEntity>

    ) {}

    async createPlaylist(name: string, musics: Music[]): Promise<playlistEntity> {
        const playlist = this.playlistRepo.create({
          name,
          musics
        });
    
        return this.playlistRepo.save(playlist);
      }


    async getPlaylistById(id:number) {
        return this.playlistRepo.findOne({where: {id:id}, relations: ['musics']});
    }

    async getPLaylistByName(name:string) {
        return await this.playlistRepo.find({where: {name}});
    }

    async getAllPlaylist() {
        return this.playlistRepo.find({relations: ['musics']})
    }

    async savePlaylist(playlist:playlistEntity): Promise<playlistEntity> {
        return this.playlistRepo.save(playlist);
    }

    async addMusicToPlaylist(playlistId: number, music: Music): Promise<playlistEntity> {
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
        return this.playlistRepo.delete(id);
    }


}