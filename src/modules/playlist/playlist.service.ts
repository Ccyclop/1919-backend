import { MusicsRepository } from "../musics/musics.repository";
import { CreatePlaylistDto } from "./dtos/create-playlist.dto";
import { playlistEntity } from "./entities/playlist.entity";
import { PlaylistRepository } from "./playlist.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { S3Service } from "../S3/S3.service";
import { S3Type } from "../S3/enum/S3.enum";
import { UpdatePlaylistDto } from "./dtos/update.playlist.dto";
import { UploadPartCommand } from "@aws-sdk/client-s3";

@Injectable()
export class PlaylistService {
    constructor( 
        private readonly playlistRepository : PlaylistRepository,
        private readonly musciRepository : MusicsRepository,
        private readonly s3Service : S3Service

    ) {}


    async CreatePlaylist(createPlaylistDto: CreatePlaylistDto, filename: string, data: Buffer, mimetype: string, type: S3Type, userId: number) {
        const {name} = createPlaylistDto

        const uploadResponse = await this.s3Service.saveS3(filename, data, mimetype, type, userId);

        const playlist = new playlistEntity()
        playlist.name = name
        playlist.photo = uploadResponse
        playlist.userId = userId
        playlist.count = 0



        return this.playlistRepository.savePlaylist(playlist)
    }

    async updatePlaylist(id:number,updatePlaylistDto: UpdatePlaylistDto, filename?: string, data?: Buffer, mimetype?: string, type?: S3Type,userId?:number) {
        const { name } = updatePlaylistDto;
    
        const playlist = await this.playlistRepository.getPlaylistById(id)
        if(!playlist) throw new NotFoundException(`playlist with id${id} not found`)
          
        if (data && mimetype && type) {
          const uploadResponse = await this.s3Service.saveS3(filename, data, mimetype, type,userId);
          playlist.photo = uploadResponse; 
        }
    
        playlist.name = name;
      
        return await this.playlistRepository.savePlaylist(playlist);
    
    
      }


    async addMusicToPlaylist(playlistId:number,musicId:number) {
        const playlist = await this.playlistRepository.getPlaylistById(playlistId)
        if(!playlist) throw new NotFoundException(`playlist with given id ${playlistId} not found`)

        const music = await this.musciRepository.findOne(musicId)
        if(!music) throw new NotFoundException(`music with id ${musicId} not found`)

        playlist.count++
        playlist.musics.push(music)
        return this.playlistRepository.savePlaylist(playlist)
    }

    async removeMusicFromPLaylsit(playlistId:number,musicId:number): Promise<playlistEntity> {
        const playlist = await this.playlistRepository.getPlaylistById(playlistId)
        if(!playlist) throw new NotFoundException(`playlist with given id ${playlistId} not found`)

        const music = await this.musciRepository.findOne(musicId)
        if(!music) throw new NotFoundException(`music with given id ${musicId} not found`)

        playlist.count--

        return this.playlistRepository.removeMusicFromPlaylist(playlistId,musicId)
    }
    
 
    async getPlayListById(id:number) {
        const playlist = await this.playlistRepository.getPlaylist(id);
        return playlist 
    }

    async getAllPlaylist(): Promise<playlistEntity[]> {
        return this.playlistRepository.getAllPlaylist()
    }

    async deletePlaylist(id:number) {
        return this.playlistRepository.deletePlaylist(id)
    }

}