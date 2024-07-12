import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/music/entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {

  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}

  async searchMusic(searchString: string): Promise<Music[]> {
    const query = this.musicRepository.createQueryBuilder('music')
      .leftJoinAndSelect('music.author', 'author')
      .leftJoinAndSelect('music.photo', 'photo')
      .leftJoinAndSelect('music.audio', 'audio')
      .leftJoinAndSelect('music.album', 'album');
      
      if (searchString) {
        const lowerCaseSearchString = `%${String(searchString).toLowerCase()}%`;
  
        query
        .andWhere('LOWER(music.name) LIKE :searchString', { searchString: lowerCaseSearchString })
          .orWhere('LOWER(author.firstName) LIKE :searchString', { searchString: lowerCaseSearchString })
          .orWhere('LOWER(album.title) LIKE :searchString', { searchString: lowerCaseSearchString });
      }
  
    return await query.getMany();
  }
}