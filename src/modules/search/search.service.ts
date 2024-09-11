import { Injectable } from '@nestjs/common';
import { MusicsRepository } from '../musics/musics.repository';
import { AuthorRepository } from '../authors/authors.repository';
import { AlbumRepository } from '../album/album.repository';
import { SearchResultDto } from './dtos/search.dto';
import { MusicEntity } from '../musics/entities/music.entity';
import { Author } from '../authors/entities/author.entity';
import { Album } from '../album/entities/album.entity';
import { PlaylistRepository } from '../playlist/playlist.repository';
import { playlistEntity } from '../playlist/entities/playlist.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicsRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly playlistRepository: PlaylistRepository
  ) {}

  async searchInfo(searchString: string): Promise<{ music: MusicEntity[], author: Author[], album: Album[],playlist: playlistEntity[] }> {
    const musicResults = await this.musicRepository.searchMusic(searchString);
    const artistResults = await this.authorRepository.searchAuthors(searchString);
    const albumResults = await this.albumRepository.searchAlbums(searchString);
    const playlistResults = await this.playlistRepository.searchPlaylists(searchString);


    return {
      music: musicResults,
      author: artistResults,
      album: albumResults,
      playlist: playlistResults
    };
  }

}