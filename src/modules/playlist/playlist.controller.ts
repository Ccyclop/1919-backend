import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { playlistEntity } from "./entities/playlist.entity";
import { CreatePlaylistDto } from "./dtos/create-playlist.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetCurrentUserId } from "../auth/decorators";
import { S3Type } from "../S3/enum/S3.enum";
import { UpdatePlaylistDto } from "./dtos/update.playlist.dto";

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
    @UseInterceptors(FileInterceptor('photo'))
    async createArtist(
        @GetCurrentUserId() userId : number,
        @Body() createPlaylistDto: CreatePlaylistDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<playlistEntity>{

    const { filename, buffer, mimetype } = file;
    const type = S3Type.PHOTO
    console.log(filename,buffer,mimetype,createPlaylistDto)
    return await this.playlsitService.CreatePlaylist(createPlaylistDto,filename, buffer, mimetype, type,userId);

    }

    @Put(':playlistId/music/:musicId')
    async addMusic(
        @Param('playlistId') playlistId: number,
        @Param('musicId') musicId: number
    ): Promise<playlistEntity> {
        return this.playlsitService.addMusicToPlaylist(playlistId,musicId)
    }


    @Put(':id')
    @UseInterceptors(FileInterceptor('photo'))
    async updatePlaylist(
        @GetCurrentUserId() userId : number,
        @Body() updatePlaylistDto: UpdatePlaylistDto,
        @Param('id') id: number,
        @UploadedFile() file?: Express.Multer.File
    ): Promise<playlistEntity> {

    let filename: string | undefined;
    let buffer: Buffer | undefined;
    let mimetype: string | undefined;
    let type: S3Type | undefined;

    if (file) {
        filename = file.originalname; 
        buffer = file.buffer;
        mimetype = file.mimetype;
        type = S3Type.PHOTO;
    }
    
        console.log(filename,buffer,mimetype,updatePlaylistDto)
        return await this.playlsitService.updatePlaylist(id,updatePlaylistDto,filename, buffer, mimetype, type,userId);
    }

    @Delete(':playlistId/music/:musicId')
    async removeMusicFromPlaylist(
        @Param('playlistId') playlistId:number,
        @Param('musicId') musicId:number
    ): Promise<playlistEntity>{
        return this.playlsitService.removeMusicFromPLaylsit(playlistId,musicId)
    }

    @Delete(':id')
    async deletePlaylist(@Param('id') id:number) {
        return await this.playlsitService.deletePlaylist(id)
    }
}