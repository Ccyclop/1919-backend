import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {

  @IsInt()
  id: number

  @IsString()
  name:string
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
