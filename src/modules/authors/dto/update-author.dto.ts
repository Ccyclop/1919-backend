import { Type } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { CreateMusicDto } from "@src/modules/musics/dtos/create-music.dto";

export class UpdateAuthorDto {

    @IsString()
    @MaxLength(255)
    @IsOptional()
    firstName?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    lastName?: string;
    
    @Type(() => CreateMusicDto)
    musics?: CreateMusicDto[]

    @IsString()
    @IsOptional()
    biography?: string

}
