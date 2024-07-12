import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig } from './config/aws.config';
import { Photo } from '../music/entities/photo.entity';
import { Audio } from '../music/entities/audio.entity';
import { Music } from './entities/music.entity';
import { AuthorRepository } from 'src/authors/authors.repository';
import { MusicRepository } from './music.repository';
// import { AlbumRepository } from 'src/album/album.repository';

@Injectable()
export class MusicService {
  private readonly s3 = new S3Client({
    region: awsConfig.region,
    credentials: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
    },
  });
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly authorRepo: AuthorRepository
  ) {}

  async savePhoto(filename: string, data: Buffer, mimetype: string): Promise<Photo> {
    const uploadParams = {
      Bucket: awsConfig.bucketName,
      Key: `photos/${Date.now()}_${filename}`,
      Body: data,
      ContentType: mimetype,
    };

    const uploadResult = await this.s3.send(new PutObjectCommand(uploadParams));
    const photoUrl = `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${uploadParams.Key}`;

    const photo = await this.musicRepository.createPhoto(photoUrl);

    return await this.musicRepository.savePhoto(photo);
  }

  async saveAudio(filename: string, data: Buffer, mimetype: string): Promise<Audio> {
    const uploadParams = {
      Bucket: awsConfig.bucketName,
      Key: `audios/${Date.now()}_${filename}`,
      Body: data,
      ContentType: mimetype,
    };

    const uploadResult = await this.s3.send(new PutObjectCommand(uploadParams));
    const audioUrl = `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${uploadParams.Key}`;

    const audio = await this.musicRepository.createAudio(audioUrl);

    return await this.musicRepository.saveAudio(audio);
  }


  async createMusic(name: string, authorId: number, photoId: number, audioId: number): Promise<Music> {
    const artist = await this.authorRepo.findOne(authorId);
    if (!artist) {
        throw new Error(`artist with id ${authorId} not found!`);
    }

    const photo = await this.musicRepository.findPhotoById(photoId);
    if (!photo) {
        throw new Error(`photo with id ${photoId} not found`);
    }

    const audio = await this.musicRepository.findAudioById(audioId);
    if (!audio) {
        throw new Error(`audio with id ${audioId} not found`);
    }

    const music = new Music();
    music.name = name;
    music.author = artist;
    music.photo = photo;
    music.audio = audio;

    return await this.musicRepository.saveMusic(music);
}
  

  async getMusicById(id: number): Promise<Music> {
    return await this.musicRepository.findMusicById(id);
  }

  async getAllMusics(): Promise<Music[]> {
    return await this.musicRepository.findAllMusic();
  }



  async removeMusicById(id: number): Promise<void> {
    const music = await this.musicRepository.findMusicById(id);
    if (!music) {
      throw new NotFoundException(`Music with id ${id} not found`);
    }
    await this.musicRepository.removeMusicById(id);
  }
 
}