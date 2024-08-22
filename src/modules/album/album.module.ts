import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "../album/entities/album.entity";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumRepository } from "./album.repository";
import { AuthorsModule } from "../authors/authors.module";
import { MusicsModule } from "../musics/musics.module";
import { MusicEntity } from "../musics/entities/music.entity";
import { S3Repository } from "../S3/S3.repository";
import { S3Entity } from "../S3/entity/S3.entity";
import { S3Service } from "../S3/S3.service";
import { S3Module } from "../S3/S3.module";
import { ConfigService } from "@nestjs/config";
import { S3HistoryService } from "../S3-history/S3-history.service";
import { S3History } from "../S3-history/entity/S3-history.entity";
import { S3HistoryRepository } from "../S3-history/S3-history.repository";
import { UserRepository } from "../user/user.repository";
import { User } from "../user/entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Album,MusicEntity,S3Entity,S3History,User]),
    MusicsModule, 
    AuthorsModule,
    S3Module
  ],
  controllers: [AlbumController],
  providers: [AlbumService,AlbumRepository,S3Repository,S3Service,ConfigService,S3HistoryService,S3HistoryRepository,UserRepository],
  exports:[AlbumRepository,AlbumService]
})
export class AlbumModule {}
  