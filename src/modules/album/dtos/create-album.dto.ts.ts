import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMusicDto } from '@src/modules/musics/dtos/create-music.dto';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  releaseDate?: string;  


  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];

  @IsString()
  authorName: string;

  @IsOptional()
  file:Express.Multer.File
}