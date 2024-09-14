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

    console.log('Fetched User:', user);
    console.log('Fetched Music:', music);
  
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (!music) {
      throw new NotFoundException(`Music with ID ${musicId} not found`);
    }
  
    // Check if music is already in user's favorites
    const isAlreadyFavorite = user.favorites.some(fav => fav.music?.id === musicId);
  
    if (isAlreadyFavorite) {
      throw new BadRequestException('Music is already in favorites');
    }
  
    const favorite = new FavoriteEntity();
    favorite.user = user;
    favorite.music = music;
  
    return this.favoriteRepository.save(favorite);
  }

  async getFavorites(userId:number) {
    return this.favoriteRepository.findByUserId(userId);
  }
}