import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateMusicDto } from '../musics/dto/create-music.dto';

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



  async findAlbumById(albumId: number): Promise<Album> {
    return this.albumRepository.findOne({ where: { id: albumId, deletedAt: null }, relations: ['author', 'musics'] });
  }
  
  async findAllAlbums(): Promise<Album[]> {
    return this.albumRepository.find({ where: { deletedAt: null }, relations: ['author', 'musics'] });
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