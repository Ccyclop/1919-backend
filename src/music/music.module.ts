import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Audio } from './entities/audio.entity';
import { Photo } from './entities/photo.entity';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MusicRepository } from './music.repository'
import { AuthorsModule } from 'src/authors/authors.module';
import { AuthorRepository } from 'src/authors/authors.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music, Audio, Photo]),
    AuthorsModule
  ],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository], 
  exports: [MusicRepository],
})
export class MusicModule {}
  