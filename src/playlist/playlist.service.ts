import { MusicsRepository } from "src/musics/musics.repository";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { playlistEntity } from "./entities/playlist.entity";
import { PlaylistRepository } from "./playlist.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Music } from "src/musics/entities/music.entity";

@Injectable()
export class PlaylistService {
    constructor( 
        private readonly playlistRepository : PlaylistRepository,
        private readonly musciRepository : MusicsRepository,

    ) {}


    async CreatePlaylist(dto: CreatePlaylistDto) {
        const {name,musicTracks} = dto
        console.log(name,musicTracks)

        const existingPlaylist = await this.playlistRepository.getPLaylistByName(name) 
        if(!existingPlaylist) throw new NotFoundException(`playlist with name ${dto.name} not found`)


        const checkedMusics = await this.musciRepository.findMusicsByIds(musicTracks)
        if(checkedMusics.length !== musicTracks.length){
            throw new NotFoundException('Some of the music IDs were not found')
        }

        return this.playlistRepository.createPlaylist(dto.name,checkedMusics)
    }


    async addMusicToPlaylist(playlistId:number,musicId:number) {
        const playlist = await this.playlistRepository.getPlaylistById(playlistId)
        if(!playlist) throw new NotFoundException(`playlist with given id ${playlistId} not found`)

        const music = await this.musciRepository.findOne(musicId)
        if(!music) throw new NotFoundException(`music with id ${musicId} not found`)

        playlist.musics.push(music)
        return this.playlistRepository.addMusicToPlaylist(playlistId,music)
    }

    async removeMusicFromPLaylsit(playlistId:number,musicId:number): Promise<playlistEntity> {
        const playlist = await this.playlistRepository.getPlaylistById(playlistId)
        if(!playlist) throw new NotFoundException(`playlist with given id ${playlistId} not found`)

        const music = await this.musciRepository.findOne(musicId)
        if(!music) throw new NotFoundException(`music with given id ${musicId} not found`)

        return this.playlistRepository.removeMusicFromPlaylist(playlistId,musicId)
    }
    
 
    async getPlayListById(id:number): Promise<playlistEntity> {
        const playlist = await this.playlistRepository.getPlaylistById(id);
        return playlist 
    }

    async getAllPlaylist(): Promise<playlistEntity[]> {
        return this.playlistRepository.getAllPlaylist()
    }

    async deletePlaylist(id:number) {
        return this.playlistRepository.deletePlaylist(id)
    }

}