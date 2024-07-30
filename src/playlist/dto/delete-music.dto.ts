import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';

export class removeMusicfromPlaylistDto {

    @IsNumber()
    playlistId:number

    @IsNumber()
    musicId:number

}