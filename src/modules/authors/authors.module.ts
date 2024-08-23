import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { MusicEntity } from '../musics/entities/music.entity';
import { AuthorRepository } from './authors.repository';
import { S3Service } from '../S3/S3.service';
import { S3Entity } from '../S3/entity/S3.entity';
import { S3Module } from '../S3/S3.module';
import { ConfigService } from '@nestjs/config';
import { S3Repository } from '../S3/S3.repository';
import { UserRepository } from '../user/user.repository';
import { S3HistoryRepository } from '../S3-history/S3-history.repository';
import { S3HistoryService } from '../S3-history/S3-history.service';
import { User } from '../user/entity/user.entity';
import { S3History } from '../S3-history/entity/S3-history.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Author, MusicEntity,S3Entity,User,S3History]),
  S3Module,
  MulterModule.register({
    limits: {
      fileSize: 10 * 1024 * 1024, 
    },
   
  }),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorRepository,S3Service,ConfigService,S3Repository,UserRepository,S3HistoryService,S3HistoryRepository],
  exports:[AuthorRepository]
})
export class AuthorsModule {}
