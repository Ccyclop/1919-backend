import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "../album/entities/album.entity";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumRepository } from "./album.repository";
import { AuthorsModule } from "../authors/authors.module";
import { MusicsModule } from "../musics/musics.module";
import { MusicEntity } from "../musics/entities/music.entity";
import { S3Repository } from "../media/S3.repository";
import { S3Entity } from "../media/entity/S3.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Album,MusicEntity,S3Entity]),
    MusicsModule, 
    AuthorsModule
  ],
  controllers: [AlbumController],
  providers: [AlbumService,AlbumRepository,S3Repository],
  exports:[AlbumRepository,AlbumService]
})
export class AlbumModule {}
  