import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { PublicRoute } from '../auth/decorators/admin.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from '../auth/decorators';
import { S3Type } from '../S3/enum/S3.enum';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('music')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Roles('admin')
  @Post()
  @UseInterceptors(FilesInterceptor('files'))  
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
  async findOne(@GetCurrentUserId() userId: number, @Param('id') id: number) {
    return await this.musicsService.findOne(id, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return await this.musicsService.update(+id, updateMusicDto);
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicsService.remove(+id);
  }
}
