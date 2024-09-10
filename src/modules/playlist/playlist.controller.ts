import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { playlistEntity } from "./entities/playlist.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { addMusicToPlaylistDto } from "./dto/add-music.dto";
import { removeMusicfromPlaylistDto } from "./dto/delete-music.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetCurrentUserId } from "../auth/decorators";
import { S3Type } from "../S3/enum/S3.enum";

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
    @UseInterceptors(FileInterceptor('img'))
    async createArtist(
        @GetCurrentUserId() userId : number,
        @Body() createPlaylistDto: CreatePlaylistDto,
        @UploadedFile() file: Express.Multer.File
    ) {

    const { filename, buffer, mimetype } = file;
    const type = S3Type.PHOTO
    console.log(filename,buffer,mimetype,createPlaylistDto)
    return await this.playlsitService.CreatePlaylist(createPlaylistDto,filename, buffer, mimetype, type,userId);

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