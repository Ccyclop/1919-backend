import { InjectRepository } from "@nestjs/typeorm";
import { FavoriteEntity } from "./entities/favorite.entity";
import { Repository } from "typeorm";

export class FavoriteRepository {
    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly favoriteRepository: Repository<FavoriteEntity>
    ) {}

    async save(favoriteEntity: FavoriteEntity) {
        return this.favoriteRepository.save(favoriteEntity);
    }

    async findByUserId(userId: number) {
        return await this.favoriteRepository
          .createQueryBuilder('favorites')
          .leftJoinAndSelect('favorites.music','music')
          .where('favorites.user.id = :userId', { userId })
          .getOne(); 
      }

    async deleteFavorite(userId:number,musicId:number) {
        await this.favoriteRepository.createQueryBuilder()
        .delete()
        .from(FavoriteEntity)
        .where('userId = :userId', { userId })
        .andWhere('musicId = :musicId', { musicId })
        .execute();
      return { message: 'Music removed from favorites' };
    }
}