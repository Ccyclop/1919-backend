import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "../album/entities/album.entity";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumRepository } from "./album.repository";
import { AuthorsModule } from "../authors/authors.module";
import { MusicsModule } from "../musics/musics.module";
import { MusicEntity } from "../musics/entities/music.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Album,MusicEntity]),
    MusicsModule, 
    AuthorsModule
  ],
  controllers: [AlbumController],
  providers: [AlbumService,AlbumRepository],
  exports:[AlbumRepository]
})
export class AlbumModule {}
  