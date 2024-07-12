import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { Photo } from './entities/photo.entity';
import { Audio } from './entities/audio.entity';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Audio)
    private readonly audioRepository: Repository<Audio>,
  ) {}

  async saveMusic(music: Music): Promise<Music> {
    return this.musicRepository.save(music);
  }

  async findAllMusic(): Promise<Music[]> {
    return this.musicRepository.find({ relations: ['author', 'photo', 'audio'] });
  }

  async findMusicById(musicId: number): Promise<Music> {
    return this.musicRepository.findOne({ where: { id: musicId }, relations: ['author', 'photo', 'audio'] });
  }

  async findMusicsByIds(musicIds: number[]): Promise<Music[]> {
    const musics = await this.musicRepository
      .createQueryBuilder('music')
      .where('music.id IN (:...musicIds)', { musicIds })
      .getMany();

      return musics
  }

  async savePhoto(photo: Photo): Promise<Photo> {
    return await this.photoRepository.save(photo);
  }

  async createPhoto(url: string): Promise<Photo> {
    const photo = this.photoRepository.create({ url });
    return await this.photoRepository.save(photo);
  }

  async findPhotoById(photoId: number): Promise<Photo> {
    return this.photoRepository.findOne({ where: { id: photoId } });
  }

  async saveAudio(audio: Audio): Promise<Audio> {
    return await this.audioRepository.save(audio);
  }

  async createAudio(url: string): Promise<Audio> {
    const audio = this.audioRepository.create({ url });
    return await this.audioRepository.save(audio);
  }

  async findAudioById(audioId: number): Promise<Audio> {
    return this.audioRepository.findOne({ where: { id: audioId } });
  }

  async removeMusicById(musicId: number): Promise<void> {
    await this.musicRepository.softDelete({ id: musicId });
  }

}