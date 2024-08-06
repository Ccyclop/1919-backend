import { MusicEntity } from 'src/modules/musics/entities/music.entity';
import { Author } from 'src/modules/authors/entities/author.entity';
import { Album } from 'src/modules/album/entities/album.entity';

export class SearchResultDto {
  type: 'music' | 'author' | 'album';
  
  data: MusicEntity | Author | Album;
}