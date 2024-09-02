import { IsNumber } from "class-validator";

export class CreateListenCounterDto {

    @IsNumber()
    userId: number;

    @IsNumber()
    musicId: number
}
