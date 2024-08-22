import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { MusicEntity } from './entities/music.entity';
import { S3Repository } from '../S3/S3.repository';

@Injectable()
export class MusicsService {

  constructor(
    private readonly musicRepo: MusicsRepository,
    private readonly S3Repository : S3Repository
    
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<MusicEntity> {
    const { name, authorId, duration, photoId, audioId } = createMusicDto;

    const music = new MusicEntity();
    music.name = name;
    music.authorId = authorId;
    music.duration = duration;

    if (photoId) {
      const photo = await this.S3Repository.findOne(photoId);
      if (!photo) {
        throw new NotFoundException(`Photo with id ${photoId} not found`);
      }
      music.photo = photo;
    }

    if (audioId) {
      const audio = await this.S3Repository.findOne(audioId);
      if (!audio) {
        throw new NotFoundException(`Audio with id ${audioId} not found`);
      }
      music.audio = audio;
    }

    return await this.musicRepo.save(music);
  }

  async findAll() {
    return await this.musicRepo.findAll();
  }

  async findOne(id: number) {
    return await this.musicRepo.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepo.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepo.remove(id);
  }
}
