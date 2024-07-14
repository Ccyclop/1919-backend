import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  releaseDate?: string;  

  @IsArray()
  @IsNumber({}, { each: true })
  musicIds: number[];

  @IsOptional()
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[]

  @IsNumber()
  authorId: number;
}