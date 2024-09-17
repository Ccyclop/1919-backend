import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from '../album/dtos/create-album.dto.ts';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dtos/update-album.dto';
import { AuthorRepository } from '../authors/authors.repository.js';
import { AlbumRepository } from './album.repository';
import { MusicsRepository } from '../musics/musics.repository.js';
import { CreateMusicDto } from '../musics/dtos/create-music.dto.js';
import { Author } from '../authors/entities/author.entity.js';
import { S3Service } from '../S3/S3.service';
import { S3Type } from '../S3/enum/S3.enum';

@Injectable()
export class AlbumService {
    constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly authorRepository:AuthorRepository,
    private readonly musicRepository: MusicsRepository,
    private readonly s3Service : S3Service
    ){}

    async createAlbum(createAlbumDto: CreateAlbumDto,filename: string, data: Buffer, mimetype: string,type: S3Type,userId:number): Promise<Album> {
      const { title, authorName, musics } = createAlbumDto;
  
      const author = await this.authorRepository.getAuthorByName(authorName);
      if (!author) {
        throw new NotFoundException(`Author with name ${authorName} not found`);
      }
  
      const uploadResponse = await this.s3Service.saveS3(filename,data,mimetype,type,userId);
    
      const album = new Album();
      album.title = title;
      album.releaseDate = new Date();
      album.author = author;
      album.authorName = authorName;
      // album.user = userId
    
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

     async getHits() {
      return await this.albumRepository.getTopHits();
    }

    async getTopCharts() {
      return await this.albumRepository.getTopCharts();
    }

    async addMusicToAlbum(albumId:number,musicId:number): Promise<Album> {
      const album = await this.albumRepository.findAlbumById(albumId)
      if (!album) throw new NotFoundException(`album with id ${albumId} not found`)

      const music = await this.musicRepository.findOne(musicId)

      album.musics.push(music)

      return this.albumRepository.saveAlbum(album)
      
    }

    async deleteMusicFromAlbum(albumId:number,musicId:number): Promise<Album> {
      const album = await this.albumRepository.findAlbumById(albumId)

      const music = await this.musicRepository.findOne(musicId)

      album.musics = album.musics.filter(m => m.id !==music.id);

      return this.albumRepository.saveAlbum(album)

    }

    async getTopAlbums(): Promise<Album[]> {
      return await this.albumRepository.findTop10AlbumsByMusic()
    }

    async getTopHits(): Promise<Album[]> {
      return await this.albumRepository.getTopHits()
    }


    async updateAlbum(id:number,updateAlbumDto: UpdateAlbumDto,filename?: string, data?: Buffer, mimetype?: string,type?: S3Type,userId?:number): Promise<Album> {
      const {  title, authorName,file } = updateAlbumDto;

      const album = await this.albumRepository.findAlbumWithArtistAndMusics(id)

      if (!album) {
          throw new NotFoundException(`Album with id ${id} not found`);
      }

      const author = await this.authorRepository.getAuthorByName(authorName);

      if (!author) {
        throw new NotFoundException(`Author with name ${authorName} not found`);
      }else {
        album.author = author
        album.authorName = authorName
      }


      if (title) {
          album.title = title;
      }

      // if (data && mimetype && type) {
      //   const uploadResponse = await this.s3Service.saveS3(filename, data, mimetype, type,userId);
      //   album.photo = uploadResponse; 
      // }

      if (file) {
        const uploadPhoto = await this.s3Service.saveS3(filename,data,mimetype,type,userId);
        album.photo= uploadPhoto;
      }

      // const uploadResponse = await this.s3Service.saveS3(filename,data,mimetype,type,userId);
      // album.photo = uploadResponse;
  

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