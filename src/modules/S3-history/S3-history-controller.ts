import { Controller, Get, Param } from '@nestjs/common';
import { S3HistoryService } from './S3-history.service';

@Controller('media-history')
export class S3HistoryController {
  constructor(private readonly mediaHistoryService: S3HistoryService) {}
}