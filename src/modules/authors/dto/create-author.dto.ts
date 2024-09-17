import { Type } from "class-transformer";
import { IsString, MaxLength } from "class-validator";
import { CreateMusicDto } from "@src/modules/musics/dtos/create-music.dto";

export class CreateAuthorDto {

    @IsString()
    @MaxLength(255)
    firstName: string;

    @IsString()
    @MaxLength(255)
    lastName: string;
    
    @Type(() => CreateMusicDto)
    musics?: CreateMusicDto[]

    @IsString()
    biography: string

}
