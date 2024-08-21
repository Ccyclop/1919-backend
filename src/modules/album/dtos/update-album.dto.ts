import { IsArray, IsNumber, IsString } from "class-validator";

export class UpdateAlbumDto {


    @IsString()
    title?: string;

    @IsArray()
    @IsNumber({},{each:true})
    musicIds?: number[];

    @IsNumber()
    authortId?: number;

    @IsNumber()
    photoId:number
}