import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Music } from 'src/musics/entities/music.entity';
import { AuthorRepository } from './authors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Music])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorRepository],
})
export class AuthorsModule {}
