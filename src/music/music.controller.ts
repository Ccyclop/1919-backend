import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dtos/create.music.dto';


@Controller('music')
export class MusicController {
    constructor(private readonly musicService:MusicService){}

    @Post('photo')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
      const { originalname, buffer, mimetype } = file;
      return await this.musicService.savePhoto(originalname, buffer, mimetype);
    }
  
    @Post('audio')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAudio(@UploadedFile() file: Express.Multer.File) {
      const { originalname, buffer, mimetype } = file;
      return await this.musicService.saveAudio(originalname, buffer, mimetype);
    }
  
    @Post()
    async createMusic(@Body() createMusicDto: CreateMusicDto) {
      const { name, authorId, photoId, audioId } = createMusicDto;
      return await this.musicService.createMusic(name, authorId, photoId, audioId);
      
    }

    @Get(':id')
    async getMusicById(@Param('id') id: string) {
      const musicId = parseInt(id, 10); 
      return await this.musicService.getMusicById(musicId);
    }

    @Get()
    async getAllMusics(){
      return await this.musicService.getAllMusics();
    }

    @Delete(':id')
    async deleteMusicById(@Param('id') id: number) {
      return await this.musicService.removeMusicById(id)
    }
}