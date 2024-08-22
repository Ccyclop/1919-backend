import { EntityRepository, Repository } from 'typeorm';
import { S3History } from './entity/S3-history.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Entity } from '../S3/entity/S3.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class S3HistoryRepository {
    constructor(@InjectRepository(S3History)
    private readonly S3HistoryRepo : Repository<S3History>) {} 
        async createHistoryEntry(
          S3Url: string,
          bucketUrl: string,
          key: string,
          user: User

        ): Promise<S3History> {
          const historyEntry = new S3History();
          historyEntry.S3Url = S3Url;
          historyEntry.bucketUrl = bucketUrl;
          historyEntry.key = key;
          historyEntry.user=user
          return await this.S3HistoryRepo.save(historyEntry);
        }
}

