import { Injectable } from '@nestjs/common';
import { CreateListenCounterDto } from './dto/create-listen-counter.dto';
import { UpdateListenCounterDto } from './dto/update-listen-counter.dto';
import { ListenCounterRepository } from './listen-counters.repository';

@Injectable()
export class ListenCountersService {

  constructor(
    private readonly listenRepo: ListenCounterRepository
  ) {}

  create(createListenCounterDto: CreateListenCounterDto) {
    console.log(createListenCounterDto)
    return this.listenRepo.create(createListenCounterDto);
  }

  findAll() {
    return `This action returns all listenCounters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listenCounter`;
  }

  update(id: number, updateListenCounterDto: UpdateListenCounterDto) {
    return `This action updates a #${id} listenCounter`;
  }

  remove(id: number) {
    return `This action removes a #${id} listenCounter`;
  }
}
