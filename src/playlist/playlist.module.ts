import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { playlistEntity } from "./entities/playlist.entity";
import { PlaylistController } from "./playlist.controller";
import { PlaylistRepository } from "./playlist.repository";
import { PlaylistService } from "./playlist.service";
import { MusicsModule } from "src/musics/musics.module";
import { Music } from "src/musics/entities/music.entity";

@Module({
    imports: [
     TypeOrmModule.forFeature([playlistEntity,Music]),
     MusicsModule
    ],
    controllers: [PlaylistController],
    providers: [PlaylistRepository,PlaylistService],
    exports: [PlaylistService,PlaylistRepository]
})
export class PlaylistMoulde {}
