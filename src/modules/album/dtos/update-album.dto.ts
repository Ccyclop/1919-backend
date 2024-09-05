import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAlbumDto {


    @IsString()
    title?: string;

    @IsArray()
    @IsNumber({},{each:true})
    @Transform(({ value }) => {
        if (typeof value === 'string') {
          return value.split(',').map(item => parseInt(item.trim(), 10));
        }})
    musicIds?: number[];

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    authorId?: number;

    @IsOptional()
    file:Express.Multer.File
}