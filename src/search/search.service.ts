import { Injectable } from '@nestjs/common';
import { MusicsRepository } from 'src/musics/musics.repository';
import { AuthorRepository } from 'src/authors/authors.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { SearchResultDto } from './dtos/search.dto';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicsRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly albumRepository: AlbumRepository
  ) {}

  async searchInfo(searchString: string): Promise<{ music: any[], artist: any[], album: any[] }> {
    const musicResults = await this.musicRepository.searchMusic(searchString);
    const artistResults = await this.authorRepository.searchAuthors(searchString);
    const albumResults = await this.albumRepository.searchAlbums(searchString);

    return {
      music: musicResults,
      artist: artistResults,
      album: albumResults,
    };
  }

}