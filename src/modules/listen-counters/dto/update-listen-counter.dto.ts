import { PartialType } from '@nestjs/mapped-types';
import { CreateListenCounterDto } from './create-listen-counter.dto';

export class UpdateListenCounterDto extends PartialType(CreateListenCounterDto) {}
