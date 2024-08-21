import { Injectable } from '@nestjs/common';
import { S3HistoryRepository } from './S3-history.repository';
import { S3History } from './entity/S3-history.entity';

@Injectable()
export class S3HistoryService {
  constructor(private readonly S3HistoryRepository: S3HistoryRepository) {}

  async logAction(
    S3Url: string,
    bucketUrl: string,
    key: string,
  ): Promise<S3History> {
    return this.S3HistoryRepository.createHistoryEntry(
      S3Url,
      bucketUrl,
      key,
    );
  }
}