import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "../album/entities/album.entity";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumRepository } from "./album.repository";
import { AuthorsModule } from "src/authors/authors.module";
import { MusicModule } from "src/music/music.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    MusicModule, 
    AuthorsModule
  ],
  controllers: [AlbumController],
  providers: [AlbumService,AlbumRepository],
  exports:[AlbumRepository]
})
export class AlbumModule {}
  