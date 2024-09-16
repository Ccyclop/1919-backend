import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { MusicEntity } from '../musics/entities/music.entity';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository:Repository<Album>,
  ) {}

  async findAlbumWithArtistAndMusics(albumId: number): Promise<Album> {
    return await this.albumRepository.createQueryBuilder('album')
      .leftJoinAndSelect('album.author', 'author')
      .leftJoinAndSelect('album.musics', 'music')
      .leftJoinAndSelect('album.photo','photo')
      .where('album.id = :albumId', { albumId })
      .getOne();
  }
 
  async findTop10AlbumsByMusic(): Promise<Album[]> {
    return this.albumRepository.createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'music')
      .leftJoinAndSelect('album.photo', 'photo')
      .leftJoinAndSelect('music.listens', 'listenerCounter')
      .addSelect('SUM(listenerCounter.id)', 'totalListeners')
      .groupBy('album.id')
      .orderBy('totalListeners', 'DESC')
      .limit(10)
      .getMany();
  }
  

  async findAlbumById(albumId: number): Promise<Album> {
    return this.albumRepository
              .createQueryBuilder('album')
              .where('album.id = :albumId', { albumId })
              .leftJoinAndSelect('album.photo','photo')
              .leftJoinAndSelect('album.author', 'author')
              .leftJoinAndSelect('album.musics','music')
              .leftJoinAndSelect('music.audio','audio')
              .leftJoinAndSelect('music.photo','phoro')
              .getOne();
  }
  
  async findAllAlbums(): Promise<Album[]> {
    return this.albumRepository.find({ where: { deletedAt: null }, relations: ['author', 'musics','photo'] });
  }

  async getMusicsForAlbum(albumId: number): Promise<MusicEntity[]> {
    const album = await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'music')
      .leftJoinAndSelect('music.photo', 'photo')
      .where('album.id = :albumId', { albumId })
      .getOne();
  
  
    return album.musics;
  }

  async saveAlbum(album: Album): Promise<Album> {
    return this.albumRepository.save(album);
  }

  async softDeleteAlbum(albumId: number): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id: albumId } });

    if (!album) {
      throw new Error(`Album with id ${albumId} not found`);
    }


    album.deletedAt = new Date();
    await this.albumRepository.save(album);
  }

  async searchAlbums(searchString: string): Promise<Album[]> {
    const lowerCaseSearchString = `%${String(searchString).toLowerCase()}%`;
    return await this.albumRepository.createQueryBuilder('album')
      .where('LOWER(album.title) LIKE :searchString', { searchString: lowerCaseSearchString })
      .getMany();
  }
}