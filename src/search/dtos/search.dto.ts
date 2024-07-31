import { MusicEntity } from 'src/musics/entities/music.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Album } from 'src/album/entities/album.entity';

export class SearchResultDto {
  type: 'music' | 'author' | 'album';
  
  data: MusicEntity | Author | Album;
}