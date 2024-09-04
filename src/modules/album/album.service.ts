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
import { S3Service } from '../S3/S3.service';
import { S3Type } from '../S3/enum/S3.enum';

@Injectable()
export class AlbumService {
    constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly authorRepository:AuthorRepository,
    private readonly musicRepository: MusicsRepository,
    private readonly S3Repository : S3Repository,
    private readonly s3Service : S3Service
    ){}

    async createAlbum(createAlbumDto: CreateAlbumDto,filename: string, data: Buffer, mimetype: string,type: S3Type,userId:number): Promise<Album> {
      const { title, authorId, musics,musicIds } = createAlbumDto;
  
      const author = await this.authorRepository.findOne(authorId);
      if (!author) {
        throw new NotFoundException(`Author with id ${authorId} not found`);
      }

      const realMusics = await this.musicRepository.findMusicsByIds(musicIds);
      if (realMusics.length !== musicIds.length) {
        throw new Error('Some of the music IDs were not found');
      }
  
      const uploadResponse = await this.s3Service.saveS3(filename,data,mimetype,type,userId);
    
      const album = new Album();
      album.title = title;
      album.releaseDate = new Date();
      album.author = author;
      album.authorId = authorId;
      album.musics = realMusics;
      album.user = userId
    
      album.photo = uploadResponse;
      
  
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
 
    async updateAlbum(id:number,updateAlbumDto: UpdateAlbumDto,filename: string, data: Buffer, mimetype: string,type: S3Type,userId:number): Promise<Album> {
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

      const uploadResponse = await this.s3Service.saveS3(filename,data,mimetype,type,userId);
      album.photo = uploadResponse;
  

      return await this.albumRepository.saveAlbum(album);
    }

    async getAllAlbums(): Promise<Album[]> {
      return await this.albumRepository.findAllAlbums();
    }

    async getTopAlbums() {
      return await this.albumRepository.findTop10AlbumsByListeners();
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