import { Injectable } from '@nestjs/common';
import { MusicsRepository } from '../musics/musics.repository';
import { AuthorRepository } from '../authors/authors.repository';
import { AlbumRepository } from '../album/album.repository';
import { SearchResultDto } from './dtos/search.dto';
import { MusicEntity } from '../musics/entities/music.entity';
import { Author } from '../authors/entities/author.entity';
import { Album } from '../album/entities/album.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicsRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly albumRepository: AlbumRepository
  ) {}

  async searchInfo(searchString: string): Promise<{ music: MusicEntity[], author: Author[], album: Album[] }> {
    const musicResults = await this.musicRepository.searchMusic(searchString);
    const artistResults = await this.authorRepository.searchAuthors(searchString);
    const albumResults = await this.albumRepository.searchAlbums(searchString);

    return {
      music: musicResults,
      author: artistResults,
      album: albumResults,
    };
  }

}