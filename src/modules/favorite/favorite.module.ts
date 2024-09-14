import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteEntity } from "./entities/favorite.entity";
import { FavoriteController } from "./favorite.controller";
import { FavoriteRepository } from "./favorite.Repository";
import { FavoriteService } from "./favorite.service";
import { UserRepository } from "../user/user.repository";
import { MusicsRepository } from "../musics/musics.repository";
import { User } from "../user/entity/user.entity";
import { MusicEntity } from "../musics/entities/music.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([FavoriteEntity,User,MusicEntity])
    ],
    controllers:[FavoriteController],
    providers:[FavoriteRepository,FavoriteService,UserRepository,MusicsRepository],
    exports:[FavoriteService,FavoriteRepository]
})
export class FavoritesModule {}

