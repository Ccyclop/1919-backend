import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
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

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];

  @IsNumber()
  authorId: number;
}