import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { MusicEntity } from './entities/music.entity';
import { S3Repository } from '../S3/S3.repository';
import { S3Type } from '../S3/enum/S3.enum';
import { S3Service } from '../S3/S3.service';
import { ListenCounterRepository } from '../listen-counters/listen-counters.repository';

@Injectable()
export class MusicsService {

  constructor(
    private readonly musicRepo: MusicsRepository,
    private readonly s3Service : S3Service,
    private readonly listenService: ListenCounterRepository
    
  ) {}

  async create(
    createMusicDto: CreateMusicDto,
    photoFile: Express.Multer.File,
    audioFile: Express.Multer.File,
    userId: number
  ): Promise<MusicEntity> {
    const { name, authorId, duration } = createMusicDto;
  
    const photoUploadResponse = await this.s3Service.saveS3(photoFile.originalname, photoFile.buffer, photoFile.mimetype, S3Type.PHOTO, userId);
  
    const audioUploadResponse = await this.s3Service.saveS3(audioFile.originalname, audioFile.buffer, audioFile.mimetype, S3Type.AUDIO, userId);
  
    const music = new MusicEntity();
    music.name = name;
    music.authorId = authorId;
    music.duration = duration;
    music.photo = photoUploadResponse;  
    music.audio = audioUploadResponse;  
  
    return await this.musicRepo.save(music);
  }

  async findAll() {
    return await this.musicRepo.findAll();
  }

  async findOne(musicId: number, userId: number) {
    const mus = await this.musicRepo.findOne(musicId)

    if (mus) {
      await this.listenService.create({musicId, userId})

      return await this.musicRepo.findOne(musicId);
    } else throw new NotFoundException('Music Not Found')

    
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepo.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepo.remove(id);
  }
}
