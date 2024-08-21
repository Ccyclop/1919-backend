import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { PublicRoute } from "../auth/decorators/admin.decorator";

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @PublicRoute()
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
      const { originalname, buffer, mimetype } = file;
      return await this.photoService.savePhoto(originalname, buffer, mimetype);
    }

    @PublicRoute()
    @Get()
    async getAllPhoto() {
        return this.photoService.getAll()
    }

    @PublicRoute()
    @Get(':id')
    async getPhoto(@Param('id') id:number) {
        return this.photoService.getOne(id)
    }

}