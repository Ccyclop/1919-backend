import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from '../album/dtos/create-album.dto.ts';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dtos/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
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