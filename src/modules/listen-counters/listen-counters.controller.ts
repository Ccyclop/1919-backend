import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListenCountersService } from './listen-counters.service';
import { CreateListenCounterDto } from './dto/create-listen-counter.dto';
import { UpdateListenCounterDto } from './dto/update-listen-counter.dto';

@Controller('listen-counters')
export class ListenCountersController {
  constructor(private readonly listenCountersService: ListenCountersService) {}

  @Post()
  create(@Body() createListenCounterDto: CreateListenCounterDto) {
    return this.listenCountersService.create(createListenCounterDto);
  }

  @Get()
  findAll() {
    return this.listenCountersService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listenCountersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListenCounterDto: UpdateListenCounterDto) {
    return this.listenCountersService.update(+id, updateListenCounterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listenCountersService.remove(+id);
  }
}
