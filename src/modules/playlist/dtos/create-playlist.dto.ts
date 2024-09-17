import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  
}