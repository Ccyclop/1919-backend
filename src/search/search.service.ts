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

  async searchInfo(searchString: string): Promise<SearchResultDto[]> {
    const musicResults = await this.musicRepository.searchMusic(searchString);
    const artistResults = await this.authorRepository.searchAuthors(searchString);
    const albumResults = await this.albumRepository.searchAlbums(searchString);

    const results: SearchResultDto[] = [];

    musicResults.forEach(music => {
      results.push({ type: 'music', data: music });
    });

    artistResults.forEach(artist => {
      results.push({ type: 'artist', data: artist });
    });

    albumResults.forEach(album => {
      results.push({ type: 'album', data: album });
    });

    return results;
  }
}