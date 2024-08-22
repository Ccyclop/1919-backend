import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './S3.service';
import { PublicRoute } from '../auth/decorators/admin.decorator';
import { S3Type } from './enum/S3.enum';
import { GetCurrentUserId } from '../auth/decorators';

@Controller('S3')
export class S3Controller {
  constructor(private readonly S3Service: S3Service) {}

  
  @Post('upload/:type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadS3(@UploadedFile() file: Express.Multer.File,@GetCurrentUserId() userId:number, @Param('type') type: S3Type) {
    const { originalname, buffer, mimetype } = file;
    return await this.S3Service.saveS3(originalname, buffer, mimetype, type,userId);
  }


  @PublicRoute()
  @Get(':type')
  async getAllS3(@Param('type') type: S3Type) {
    return this.S3Service.getAll(type);
  }

  @PublicRoute()
  @Get(':type/:id')
  async getS3(@Param('type') type: S3Type, @Param('id') id: number) {
    return this.S3Service.getOne(id);
  }
}