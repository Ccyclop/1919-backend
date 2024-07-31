import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicsRepository } from './musics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Author } from 'src/authors/entities/author.entity';
import { UserModule } from 'src/user/user.module';
import { PlaylistMoulde } from 'src/playlist/playlist.module';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity, Author]),
    UserModule

],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository],
  exports:[MusicsRepository]
})
export class MusicsModule {}
