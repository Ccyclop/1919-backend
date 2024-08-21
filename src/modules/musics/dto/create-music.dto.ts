import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMusicDto {

    @IsString()
    @MaxLength(255)
    name: string;

    @IsNumber()
    authorId: number;

    @IsNumber()
    duration: number;

    @IsOptional()
    @IsNumber()
    photoId: number;

    @IsNumber()
    audioId: number;
}