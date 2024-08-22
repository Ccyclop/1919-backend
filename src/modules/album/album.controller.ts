import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from '../album/dtos/create-album.dto.ts';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dtos/update-album.dto';
import { PublicRoute } from '../auth/decorators/admin.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from '../auth/decorators';
import { S3Type } from '../S3/enum/S3.enum';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @PublicRoute()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createAlbum(
    @GetCurrentUserId() userId: number,
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const { originalname, buffer, mimetype } = file;
    const type = S3Type.PHOTO
    return await this.albumService.createAlbum(createAlbumDto,originalname, buffer, mimetype, type,userId);
  }

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return await this.albumService.getAlbum(parseInt(id, 10));
  }

  @Put(':id')
  async updateAlbum(@Param('id') albumId: number, @Body() updateAlbumDto: UpdateAlbumDto,): Promise<Album> {
    console.log(updateAlbumDto)
      return await this.albumService.updateAlbum(albumId,updateAlbumDto);
  }

  @Delete(':id')
    async deleteAlbum(@Param('id') albumId: number): Promise<void> {
        await this.albumService.deleteAlbum(albumId);
    }

}