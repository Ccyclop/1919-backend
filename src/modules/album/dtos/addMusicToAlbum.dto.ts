import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class AddMusicToAlbumDto {

    @IsArray()
    @IsNumber({}, { each: true })
    musicIds?: number[];

}