import { IsArray, IsNumber } from "class-validator";

export class DeleteMusicFromAlbumDto {

    @IsNumber()
    musicId: number;
}