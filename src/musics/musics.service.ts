import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { ViewsRepository } from 'src/views/views.repository';
import { View } from 'src/views/entities/view.entity';

@Injectable()
export class MusicsService {

  constructor(private readonly musicRepo: MusicsRepository,
              private readonly viewRepo: ViewsRepository) {}

  async create(createMusicDto: CreateMusicDto) {
    const mus = this.musicRepo.create(createMusicDto);

    const view = new View()
    view.count = 0
    view.music = mus
    const savedView = await this.viewRepo.create(view)
    
    mus.views = savedView

    const savedMus = await this.musicRepo.save(mus)
    return savedMus
  }

  async findAll() {
    return await this.musicRepo.findAll();
  }

  async findOne(id: number) {
    return await this.musicRepo.findOne(id);
  }

  async incrementView(id: number) {
    const mus = await this.musicRepo.findOne(id)
    
    if(!mus) throw new NotFoundException('Music Not Found')
    
    const view = mus.views
    view.count += 1
    await this.viewRepo.save(view)
    return mus

  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepo.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepo.remove(id);
  }
}
