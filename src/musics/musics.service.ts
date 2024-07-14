import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';

@Injectable()
export class MusicsService {

  constructor(private readonly musicRepo: MusicsRepository) {}

  async create(createMusicDto: CreateMusicDto) {
    return await this.musicRepo.create(createMusicDto);
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
