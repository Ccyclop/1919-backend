import { IsString, isString } from "class-validator";

export class ChangePasswrodDto {

    @IsString()
    newPassword: string

}