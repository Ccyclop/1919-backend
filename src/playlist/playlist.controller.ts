import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { playlistEntity } from "./entities/playlist.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { addMusicToPlaylistDto } from "./dto/add-music.dto";
import { removeMusicfromPlaylistDto } from "./dto/delete-music.dto";

@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlsitService: PlaylistService) {}

    @Get()
    async getAll(): Promise<playlistEntity[]> {
        return this.playlsitService.getAllPlaylist();
    }

    @Get(':id')
    async getOne(@Param('id') id:number): Promise<playlistEntity>{
        return this.playlsitService.getPlayListById(id)
    }

    @Post()
    async createPlaylist(@Body() dto:CreatePlaylistDto) {
        return this.playlsitService.CreatePlaylist(dto)
    }

    @Put()
    async addMusicToPlaylist(@Body() dto: addMusicToPlaylistDto) {
        return this.playlsitService.addMusicToPlaylist(dto.playlistId,dto.musicId);
    }

    @Delete(':id')
    async deletePlaylist(@Param('id') id:number) {
        return this.playlsitService.deletePlaylist(id)
    }

    @Delete()
    async removeMusicFromPlaylist(@Body() dto:removeMusicfromPlaylistDto) {
        return await this.playlsitService.removeMusicFromPLaylsit(dto.playlistId,dto.musicId)
    }
}