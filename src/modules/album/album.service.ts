import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from '../musics/entities/music.entity';
import { CreateAlbumDto } from '../album/dtos/create-album.dto.ts';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dtos/update-album.dto';
import { AuthorRepository } from '../authors/authors.repository.js';
import { AlbumRepository } from './album.repository';
import { MusicsRepository } from '../musics/musics.repository.js';
import { CreateMusicDto } from '../musics/dto/create-music.dto.js';
import { Author } from '../authors/entities/author.entity.js';
import { S3Repository } from '../S3/S3.repository';

@Injectable()
export class AlbumService {
    constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly authorRepository:AuthorRepository,
    private readonly musicRepository: MusicsRepository,
    private readonly S3Repository : S3Repository
    ){}

    async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
      const { title, authorId, musics,musicIds,photoId } = createAlbumDto;
  
      const author = await this.authorRepository.findOne(authorId);
      if (!author) {
        throw new NotFoundException(`Author with id ${authorId} not found`);
      }

      const realMusics = await this.musicRepository.findMusicsByIds(musicIds);
      if (realMusics.length !== musicIds.length) {
        throw new Error('Some of the music IDs were not found');
      }
  
      const album = new Album();
      album.title = title;
      album.releaseDate = new Date();
      album.author = author;
      album.authorId = authorId
      album.musics = realMusics 

      if (photoId) {
        const photo = await this.S3Repository.findOne(photoId);
        if (!photo) {
          throw new NotFoundException(`Photo with id ${photoId} not found`);
        }
        album.photo = photo; 
      }
  
      return await this.saveAlbumWithMusics(album, musics, author);
    }

    async saveAlbumWithMusics(album: Album, musics: CreateMusicDto[], author: Author): Promise<Album> {
      const savedAlbum = await this.albumRepository.saveAlbum(album);
  
      if (musics && musics.length > 0) {
        const savedMusics = await this.musicRepository.saveMusics(musics);
  
        savedAlbum.musics = savedMusics;
        await this.albumRepository.saveAlbum(savedAlbum);
      }
  
      return savedAlbum;
    }
 
    async updateAlbum(id:number,updateAlbumDto: UpdateAlbumDto): Promise<Album> {
      const {  title, musicIds, authortId,photoId } = updateAlbumDto;

      const album = await this.albumRepository.findAlbumWithArtistAndMusics(id)

      if (!album) {
          throw new NotFoundException(`Album with id ${id} not found`);
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
      if (photoId) {
        const photo = await this.S3Repository.findOne(photoId);
        if (!photo) {
          throw new NotFoundException(`Photo with id ${photoId} not found`);
        }
        album.photo = photo; 
      }
  

      return await this.albumRepository.saveAlbum(album);
    }

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
    
      if (album.musics) {
        for (const music of album.musics) {
          music.deletedAt = new Date();
          await this.musicRepository.save(music); 
        }
      }
    
      await this.albumRepository.softDeleteAlbum(albumId); 
    }

}