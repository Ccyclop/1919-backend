import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GetCurrentUserId } from "../auth/decorators";
import { FavoriteService } from "./favorite.service";

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}


  @Get() 
  async getAllFavorties(
    @GetCurrentUserId() userId:number
  ){
    return await this.favoriteService.getFavorites(userId);
  }


  @Put('addMusic/:musicId')
  async addMusicToFavorites(
    @Param('musicId') musicId :number,
    @GetCurrentUserId() userId :number
    ) {
        return this.favoriteService.addMusicToFavorites(userId,musicId)
  }

  @Delete('deleteMusic/:musicid')
  async deleteMusicFromFavorites(
    @Param('musicid') musicid :number,
    @GetCurrentUserId() userId :number
  ){
    return await this.favoriteService.deleMusicFromFavorites(userId,musicid)
  }
}