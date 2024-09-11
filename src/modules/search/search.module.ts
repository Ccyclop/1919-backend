import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MusicEntity } from "../musics/entities/music.entity";
import { SearchController } from "./search.contorller";
import { SearchService } from "./search.service";
import { Author } from "../authors/entities/author.entity";
import { Album } from "../album/entities/album.entity";
import { MusicsModule } from "../musics/musics.module";
import { SearchRepository } from "./search.repository";
import { AuthorsModule } from "../authors/authors.module";
import { MustBeEntityError } from "typeorm";
import { AlbumModule } from "../album/album.module";
import { PlaylistMoulde } from "../playlist/playlist.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    AuthorsModule,MusicsModule,AlbumModule,PlaylistMoulde
  ],
  controllers: [SearchController],
  providers: [SearchService,SearchRepository],
  exports:[SearchRepository]
  

})
export class SearchModule {}
  