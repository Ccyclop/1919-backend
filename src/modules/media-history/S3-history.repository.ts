import { EntityRepository, Repository } from 'typeorm';
import { S3History } from './entity/S3-history.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Entity } from '../media/entity/S3.entity';

@Injectable()
export class S3HistoryRepository {
    constructor(@InjectRepository(S3History)
    private readonly S3HistoryRepo : Repository<S3History>) {} 
        async createHistoryEntry(
          S3Url: string,
          bucketUrl: string,
          key: string,

        ): Promise<S3History> {
          const historyEntry = new S3History();
          historyEntry.S3Url = S3Url;
          historyEntry.bucketUrl = bucketUrl;
          historyEntry.key = key;
          return await this.S3HistoryRepo.save(historyEntry);
        }
}

