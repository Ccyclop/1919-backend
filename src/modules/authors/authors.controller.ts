import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PublicRoute } from '../auth/decorators/admin.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Type } from '../S3/enum/S3.enum';
import { GetCurrentUserId } from '../auth/decorators';

@Controller('author')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @PublicRoute()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createAlbum(
    @GetCurrentUserId() userId : number,
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const { originalname, buffer, mimetype } = file;
    const type = S3Type.PHOTO
    return await this.authorsService.create(createAuthorDto,originalname, buffer, mimetype, type,userId);
  }


  @Get()
  async findAll() {
    return await this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authorsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return await this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.authorsService.remove(+id);
  }
}
