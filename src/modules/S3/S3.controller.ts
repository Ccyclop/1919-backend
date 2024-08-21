import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './S3.service';
import { PublicRoute } from '../auth/decorators/admin.decorator';

@Controller('S3')
export class S3Controller {
  constructor(private readonly S3Service: S3Service) {}

  @PublicRoute()
  @Post('upload/:type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadS3(@UploadedFile() file: Express.Multer.File, @Param('type') type: 'audio' | 'photo') {
    const { originalname, buffer, mimetype } = file;
    return await this.S3Service.saveS3(originalname, buffer, mimetype, type);
  }


  @PublicRoute()
  @Get(':type')
  async getAllS3(@Param('type') type: 'audio' | 'photo') {
    return this.S3Service.getAll(type);
  }

  @PublicRoute()
  @Get(':type/:id')
  async getS3(@Param('type') type: 'audio' | 'photo', @Param('id') id: number) {
    return this.S3Service.getOne(id);
  }
}