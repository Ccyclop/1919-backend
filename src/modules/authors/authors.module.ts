import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { MusicEntity } from '../musics/entities/music.entity';
import { AuthorRepository } from './authors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author, MusicEntity])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorRepository],
  exports:[AuthorRepository]
})
export class AuthorsModule {}
