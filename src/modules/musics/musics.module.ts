import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicsRepository } from './musics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Author } from '../authors/entities/author.entity';
import { UserModule } from '@src/modules/user/user.module';
import { PlaylistMoulde } from '../playlist/playlist.module';
import { AudioRepository } from '../audio/audio.repository';
import { S3Repository } from '../media/S3.repository';
import { S3Entity } from '../media/entity/S3.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity, Author,S3Entity]),
    UserModule

],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository,S3Repository],
  exports:[MusicsRepository]
})
export class MusicsModule {}
