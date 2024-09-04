import { IsNotEmpty, IsString, Min } from 'class-validator';

export class ChangePDto {


  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
