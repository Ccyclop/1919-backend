import { Module } from '@nestjs/common';
import { ListenCountersService } from './listen-counters.service';
import { ListenCountersController } from './listen-counters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenCounterEntity } from './entities/listen-counter.entity';
import { ListenCounterRepository } from './listen-counters.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ListenCounterEntity])],
  controllers: [ListenCountersController],
  providers: [ListenCountersService, ListenCounterRepository],
  exports: [ListenCounterRepository]
})
export class ListenCountersModule {}
