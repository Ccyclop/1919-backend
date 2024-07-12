import { IsNumber, IsString } from "class-validator";

export class CreateMusicDto {
    @IsString()
    name: string;



    @IsNumber()
    authorId: number;
    @IsNumber()
    photoId: number;
    @IsNumber()
    audioId: number;
}