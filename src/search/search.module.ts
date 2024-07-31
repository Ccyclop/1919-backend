import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MusicEntity } from "src/musics/entities/music.entity";
import { SearchController } from "./search.contorller";
import { SearchService } from "./search.service";
import { Author } from "src/authors/entities/author.entity";
import { Album } from "src/album/entities/album.entity";
import { MusicsModule } from "src/musics/musics.module";
import { SearchRepository } from "./search.repository";
import { AuthorsModule } from "src/authors/authors.module";
import { MustBeEntityError } from "typeorm";
import { AlbumModule } from "src/album/album.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    AuthorsModule,MusicsModule,AlbumModule,
  ],
  controllers: [SearchController],
  providers: [SearchService,SearchRepository],
  exports:[SearchRepository]
  

})
export class SearchModule {}
  