import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { PublicRoute } from '../auth/decorators/admin.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from '../auth/decorators';
import { S3Type } from '../S3/enum/S3.enum';

@Controller('music')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @PublicRoute()
  @Post()
  @UseInterceptors(FilesInterceptor('files'))  // Handles multiple files
  async createMusic(
    @GetCurrentUserId() userId: number,
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {

    const photoFile = files.find(file => file.mimetype.startsWith('image/'));
    const audioFile = files.find(file => file.mimetype.startsWith('audio/'));
  
    if (!photoFile || !audioFile) {
      throw new BadRequestException('Both audio and photo files are required');
    }
  
    return await this.musicsService.create(createMusicDto, photoFile, audioFile, userId);
  }

  @Get()
  async findAll() {
    return await this.musicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return await this.musicsService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicsService.remove(+id);
  }
}
