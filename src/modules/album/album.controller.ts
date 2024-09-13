import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from '../album/dtos/create-album.dto.ts';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dtos/update-album.dto';
import { PublicRoute } from '../auth/decorators/admin.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from '../auth/decorators';
import { S3Type } from '../S3/enum/S3.enum';
import { Roles } from '../auth/decorators/role.decorator';
import { CustomBody } from '../auth/decorators/body.decorator';
import { AddMusicToAlbumDto } from './dtos/addMusicToAlbum.dto';
import { DeleteMusicFromAlbumDto } from './dtos/deleteMusicFromAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Roles('admin')
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
  
  @Roles('admin')
  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get('top')
  async getTopAlbums(): Promise<Album[]> {
    return this.albumService.getTopAlbums();
  }

  @Roles('admin')
  @Get(':id')
  async getAlbumById(@Param('id') id: string): Promise<Album> {
    return await this.albumService.getAlbum(parseInt(id, 10));
  }

  @Roles('admin')
  @Put('addMusic/:id')
  async addMusicToAlbum(
    @Param('id') id: number,
    @CustomBody() addMusicToAlbumDto: AddMusicToAlbumDto
): Promise<Album> {
     return await this.albumService.addMusicToAlbum(id,addMusicToAlbumDto.musicId)
  }

  @Roles('admin')
  @Delete(':albumId/music/:musicId')
  async deleteMusicFromAlbum(
    @Param('albumId') albumId:number,
    @Param('musicId') musicId:number,
  ): Promise<Album> {
    return await this.albumService.deleteMusicFromAlbum(albumId,musicId)
  }

  @Roles('admin')
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateAlbum(
    @Param('id') id:number,
    @GetCurrentUserId() userId: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<Album> {

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
    return await this.albumService.updateAlbum(id,updateAlbumDto,filename, buffer, mimetype, type,userId);
  }

  @Roles('admin')
  @Delete(':id')
    async deleteAlbum(@Param('id') albumId: number): Promise<void> {
        await this.albumService.deleteAlbum(albumId);
    }




}