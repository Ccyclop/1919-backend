import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Music } from "src/music/entities/music.entity";
import { SearchController } from "./search.contorller";
import { SearchService } from "./search.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([Music])
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
  