import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { playlistEntity } from "./entities/playlist.entity";
import { PlaylistController } from "./playlist.controller";
import { PlaylistRepository } from "./playlist.repository";
import { PlaylistService } from "./playlist.service";
import { MusicsModule } from "src/musics/musics.module";
import { MusicEntity } from "src/musics/entities/music.entity";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
     TypeOrmModule.forFeature([playlistEntity,MusicEntity]),
     MusicsModule,UserModule
    ],
    controllers: [PlaylistController],
    providers: [PlaylistRepository,PlaylistService],
    exports: [PlaylistService,PlaylistRepository]
})
export class PlaylistMoulde {}
