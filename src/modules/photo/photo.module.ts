import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "./entity/photo.entity";
import { PhotoController } from "./photo.controller";
import { PhotoRepository } from "./photo.repository";
import { PhotoService } from "./photo.service";

@Module({
    imports:[TypeOrmModule.forFeature([Photo])],
    controllers: [PhotoController],
    providers: [PhotoService,PhotoRepository],
    exports: []
})
export class PhotoModule {}