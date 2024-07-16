import { Injectable } from '@nestjs/common';
import { MusicsRepository } from 'src/musics/musics.repository';
import { AuthorRepository } from 'src/authors/authors.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { SearchResultDto } from './dtos/search.dto';
import { Music } from 'src/musics/entities/music.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicsRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly albumRepository: AlbumRepository
  ) {}

  async searchInfo(searchString: string): Promise<{ music: Music[], author: Author[], album: Album[] }> {
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