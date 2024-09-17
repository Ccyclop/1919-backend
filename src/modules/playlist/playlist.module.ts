import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { playlistEntity } from "./entities/playlist.entity";
import { PlaylistController } from "./playlist.controller";
import { PlaylistRepository } from "./playlist.repository";
import { PlaylistService } from "./playlist.service";
import { MusicsModule } from "../musics/musics.module";
import { MusicEntity } from "../musics/entities/music.entity";
import { UserModule } from "@src/modules/user/user.module";
import { S3Entity } from "../S3/entity/S3.entity";
import { S3HistoryService } from "../S3-history/S3-history.service";
import { S3HistoryRepository } from "../S3-history/S3-history.repository";
import { S3History } from "../S3-history/entity/S3-history.entity";
import { S3Module } from "../S3/S3.module";

@Module({
    imports: [
     TypeOrmModule.forFeature([playlistEntity,MusicEntity,S3Entity,S3History]),
     MusicsModule,UserModule,S3Module,
    ],
    controllers: [PlaylistController],
    providers: [PlaylistRepository,PlaylistService,S3HistoryService,S3HistoryRepository],
    exports: [PlaylistService,PlaylistRepository]
})
export class PlaylistMoulde {}
