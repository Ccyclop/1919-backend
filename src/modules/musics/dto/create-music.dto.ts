import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMusicDto {

    @IsString()
    @MaxLength(255)
    name: string;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    authorId: number;



}