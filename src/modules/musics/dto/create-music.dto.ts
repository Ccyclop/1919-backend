import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMusicDto {

    @IsString()
    @MaxLength(255)
    name: string;

    @IsString()
    authorName: string;






}