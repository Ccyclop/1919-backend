import { Controller, Get, Param } from '@nestjs/common';
import { S3HistoryService } from './S3-history.service';
import { S3History } from './entity/S3-history.entity';

@Controller('media-history')
export class S3HistoryController {
  constructor(private readonly mediaHistoryService: S3HistoryService) {}

}