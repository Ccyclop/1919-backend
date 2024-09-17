import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException, Put } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dtos/create-music.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from '../auth/decorators';
import { Roles } from '../auth/decorators/role.decorator';
import { MusicEntity } from './entities/music.entity';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Controller('music')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}
  
  @Roles('admin')
  @Post()
  @UseInterceptors(FilesInterceptor('files'))  
  async createMusic(
    @GetCurrentUserId() userId: number,
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<MusicEntity> {

    const photoFile = files.find(file => file.mimetype.startsWith('image/'));
    const audioFile = files.find(file => file.mimetype.startsWith('audio/'));
  
    if (!photoFile || !audioFile) {
      throw new BadRequestException('Both audio and photo files are required');
    }
  
    return await this.musicsService.create(createMusicDto, photoFile, audioFile, userId);
  }

  @Get()
  async findAll(): Promise<MusicEntity[]> {
    return await this.musicsService.findAll()
  }

  @Get('notInAlbum/:id')
  async getMusicNotInAlbum(@Param('id') albumId: number): Promise<MusicEntity[]> {
    return this.musicsService.getMusicNotInAlbum(albumId);
  }

  @Get('inAlbum/:id')
  async getMusicInPLaylist(@Param('id') PLaylistId: number): Promise<MusicEntity[]> {
    return this.musicsService.getMusicInAlbum(PLaylistId);
  }

  @Get('notInPlaylist/:id')
  async getMusicNotInPlaylist(@Param('id') playlistId: number): Promise<MusicEntity[]> {
    return this.musicsService.recommended(playlistId);
  }

  @Get('inPLaylist/:id')
  async getMusicInPlaylist(@Param('id') playlistId: number): Promise<MusicEntity[]> {
    return this.musicsService.getMusicInPlaylist(playlistId);
  }

  @Get('day')
  async getTopDayMusic(): Promise<MusicEntity[]> {
    return this.musicsService.getTop10MusicForlastDay()
  }

  @Get('week')
  async getTopWeek(): Promise<MusicEntity[]> {
    return await this.musicsService.getTop10MusicForLastWeek();
  }

  @Get('month')
  async getTopMonth(): Promise<MusicEntity[]> {
    return await this.musicsService.getTop10MusicForLastMonth()
  }


  @Get(':id')
  async findOne(@GetCurrentUserId() userId: number, @Param('id') id: number): Promise<MusicEntity> {
    return await this.musicsService.findOne(id, userId);
  }

  @Roles('admin')
  @Put(':id')
  @UseInterceptors(FilesInterceptor('files'))  
  async updateMusic(
    @Param('id') id:number,
    @GetCurrentUserId() userId: number,
    @Body() updateMusicDto: UpdateMusicDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ): Promise<MusicEntity> {

    const photoFile = files.find(file => file.mimetype.startsWith('image/'));
    const audioFile = files.find(file => file.mimetype.startsWith('audio/'));
  
  
    return await this.musicsService.updateMusic(id,updateMusicDto, photoFile, audioFile, userId);
  }


  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MusicEntity> {
    return await this.musicsService.remove(+id);
  }


  
}
