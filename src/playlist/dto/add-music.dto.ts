import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';

export class addMusicToPlaylistDto {

    @IsNumber()
    playlistId:number

    @IsNumber()
    musicId:number

}