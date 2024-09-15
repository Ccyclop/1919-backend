import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MusicsRepository } from "../musics/musics.repository";
import { UserRepository } from "../user/user.repository";
import { FavoriteEntity } from "./entities/favorite.entity";
import { FavoriteRepository } from "./favorite.Repository";

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userRepository: UserRepository,
    private readonly musicRepository: MusicsRepository
  ) {}

  async addMusicToFavorites(userId: number, musicId: number): Promise<FavoriteEntity> {
    const user = await this.userRepository.findById(userId)
    const music = await this.musicRepository.findOne(musicId);


    if (!user) {
      throw new NotFoundException(`user with id ${userId} not found`);
    }
    if (!music) {
      throw new NotFoundException(`music with id ${musicId} not found`);
    }
  
    const favorite = new FavoriteEntity();
    favorite.user = user;
    favorite.music = music
    
    return this.favoriteRepository.save(favorite);
  }

  async getFavorites(userId:number) {
    return this.favoriteRepository.findByUserId(userId);
  }

  async deleMusicFromFavorites(userId:number,musicId:number) { 
    return await this.favoriteRepository.deleteFavorite(userId,musicId)
  }
}