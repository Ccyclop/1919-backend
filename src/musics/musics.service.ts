import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';

@Injectable()
export class MusicsService {

  constructor(private readonly musicRepo: MusicsRepository) {}

  create(createMusicDto: CreateMusicDto) {
    return this.musicRepo.create(createMusicDto);
  }

  findAll() {
    return this.musicRepo.findAll();
  }

  findOne(id: number) {
    return this.musicRepo.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepo.update(id, updateMusicDto);
  }

  remove(id: number) {
    return this.musicRepo.remove(id);
  }
}
