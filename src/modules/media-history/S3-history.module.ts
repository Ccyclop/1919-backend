import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3History } from './entity/S3-history.entity';
import { S3HistoryRepository } from './S3-history.repository';
import { S3HistoryService } from './S3-history.service';
import { S3HistoryController } from './S3-history-controller';
import { S3Entity } from '../S3/entity/S3.entity';

@Module({
  imports: [TypeOrmModule.forFeature([S3History,S3Entity])],
  providers: [S3HistoryService, S3HistoryRepository],
  controllers: [S3HistoryController],
  exports: [S3HistoryService,S3HistoryRepository], 
})
export class S3HistoryModule {}