import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateMusicDto {

    @IsString()
    @MaxLength(255)
    name: string;

    @IsNumber()
    artistId: number;

    @IsNumber()
    duration: number
}
