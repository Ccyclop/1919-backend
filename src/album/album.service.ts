import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/music/entities/music.entity';
import { CreateAlbumDto } from '../album/dtos/create-album.dto.ts';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dtos/update-album.dto';
import { AuthorRepository } from 'src/authors/authors.repository';
import { AlbumRepository } from './album.repository';
import { MusicRepository } from 'src/music/music.repository';

@Injectable()
export class AlbumService {
    constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly authorRepository:AuthorRepository,
    private readonly musicRepository: MusicRepository,
    ){}

    


  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { title, musicIds, authorId } = createAlbumDto;

    const artist = await this.authorRepository.findOne(authorId);
    if (!artist) {
      throw new Error(`author with id ${authorId} not found`);
    }

    const musics = await this.musicRepository.findMusicsByIds(musicIds);
    if (musics.length !== musicIds.length) {
      throw new Error('Some of the music IDs were not found');
    }

    const album = new Album();
    album.title = title;
    album.releaseDate = new Date();
    album.author = artist;
    album.musics = musics;

    return await this.albumRepository.saveAlbum(album);
  }
  // async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
  //   const { title, musicIds, artistId } = createAlbumDto;
  
  //   const artist = await this.authorRepository
  //     .createQueryBuilder('artist')
  //     .where('artist.id = :artistId', { artistId })
  //     .getOne();  


  //   if (!artist) {
  //     throw new Error(`artist with id ${artistId} not found`);
  //   }
  
  //   const musics = await this.musicRepository
  //     .createQueryBuilder('music')
  //     .where('music.id IN (:...musicIds)', { musicIds })
  //     .getMany();
  
  //   if (musics.length !== musicIds.length) {
  //     throw new Error('Some of the music IDs were not found');
  //   }
  
  //   const album = new Album();
  //   album.title = title;
  //   album.releaseDate = new Date();
  //   album.artistId = artist;
  //   album.musics = musics;
  
  //   return await this.albumRepository.save(album);
  // }

  async updateAlbum(updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const { albumId, title, musicIds, authortId } = updateAlbumDto;

    const album = await this.albumRepository.findAlbumWithArtistAndMusics(albumId)

    if (!album) {
        throw new NotFoundException(`Album with id ${albumId} not found`);
    }

    if (title) {
        album.title = title;
    }

    if (authortId) {
        const artist = await this.authorRepository.findOne(authortId);

        if (!artist) {
            throw new NotFoundException(`Artist with id ${authortId} not found`);
        }

        album.author = artist;
    }

    if (musicIds) {
        const musics = await this.musicRepository.findMusicsByIds(musicIds)
            
        if (musics.length !== musicIds.length) {
            throw new NotFoundException('Some of the music IDs were not found');
        }
        
        album.musics = musics;
    }

    return await this.albumRepository.saveAlbum(album);
}


    // async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    //   const { title, musicIds, artistId } = createAlbumDto;

    //   const artist = await this.authorRepository.findOne({where:{id:artistId}});

    //   const fetchedMusics: Music[] = [];
    //   for(const musicId of musicIds) {
    //     const music = await this.musicRepository.findOne({ where: { id: musicId } });
    //     if (music) {
    //       fetchedMusics.push(music);
    //     };  
    //   }
    //   // const fetchedMusics = await Promise.all(fetchMusicPromises);

    //   const album = {
    //     title,
    //     releaseDate: new Date(), 
    //     artistId: { id: artistId },
    //     musics: fetchedMusics,
    //   };

    //   return await this.albumRepository.save(album);
    // }



    async getAllAlbums(): Promise<Album[]> {
      return await this.albumRepository.findAllAlbums();
    }



    async getAlbum(albumId: number): Promise<Album> {
      const album = await this.albumRepository.findAlbumById(albumId);
  
      if (!album) {
        throw new NotFoundException(`album with id ${albumId} not found`);
      }
  
      return album;
    }

    async deleteAlbum(albumId: number): Promise<void> {
      const album = await this.albumRepository.findAlbumById(albumId);
    
      if (!album) {
        throw new NotFoundException(`Album with id ${albumId} not found`);
      }
    
      await this.albumRepository.softDeleteAlbum(albumId);
    }
}