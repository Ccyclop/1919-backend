import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestHistoryService } from './history.service';
import { RequestHistoryRepo } from './history.repository';
import { RequestHistory } from './entity/request-history';
import { RequestHistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestHistory])],
  controllers : [RequestHistoryController],
  providers: [RequestHistoryService, RequestHistoryRepo],
  exports: [RequestHistoryService],
})
export class RequestHistoryModule {}