import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { PublicRoute } from "../auth/decorators/admin.decorator";

@Controller('photo')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}

    @PublicRoute()
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
      const { originalname, buffer, mimetype } = file;
      return await this.audioService.saveAudio(originalname, buffer, mimetype);
    }

    @PublicRoute()
    @Get()
    async getAllPhoto() {
        return this.audioService.getAll()
    }

    @PublicRoute()
    @Get(':id')
    async getPhoto(@Param('id') id:number) {
        return this.audioService.getOne(id)
    }

}