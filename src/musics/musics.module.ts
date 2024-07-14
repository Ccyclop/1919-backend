import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicsRepository } from './musics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Author } from 'src/authors/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Author])],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository],
  exports:[MusicsRepository]
})
export class MusicsModule {}
