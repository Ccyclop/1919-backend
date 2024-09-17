import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';

export class UpdatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  
}