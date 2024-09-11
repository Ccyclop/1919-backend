import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicsRepository } from './musics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Author } from '../authors/entities/author.entity';
import { UserModule } from '@src/modules/user/user.module';
import { PlaylistMoulde } from '../playlist/playlist.module';
import { S3Repository } from '../S3/S3.repository';
import { S3Entity } from '../S3/entity/S3.entity';
import { S3Service } from '../S3/S3.service';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/entity/user.entity';
import { S3HistoryService } from '../S3-history/S3-history.service';
import { S3History } from '../S3-history/entity/S3-history.entity';
import { S3HistoryRepository } from '../S3-history/S3-history.repository';
import { ListenCountersService } from '../listen-counters/listen-counters.service';
import { ListenCounterRepository } from '../listen-counters/listen-counters.repository';
import { ListenCounterEntity } from '../listen-counters/entities/listen-counter.entity';
import { S3Module } from '../S3/S3.module';
import { S3HistoryModule } from '../S3-history/S3-history.module';
import { ListenCountersModule } from '../listen-counters/listen-counters.module';
import { AuthorRepository } from '../authors/authors.repository';
import { AlbumRepository } from '../album/album.repository';
import { Album } from '../album/entities/album.entity';
import { PlaylistRepository } from '../playlist/playlist.repository';
import { PlaylistService } from '../playlist/playlist.service';
import { playlistEntity } from '../playlist/entities/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity, Author,S3Entity,User,S3History, ListenCounterEntity,Album,playlistEntity]),
    UserModule, S3Module, S3HistoryModule

  ],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository, ListenCounterRepository,AuthorRepository,AlbumRepository,PlaylistRepository],
  exports:[MusicsRepository,MusicsService]
})
export class MusicsModule {} 
