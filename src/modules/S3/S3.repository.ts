import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Entity } from './entity/S3.entity';

@Injectable()
export class S3Repository {
  constructor(
    @InjectRepository(S3Entity)
    private readonly S3Repository: Repository<S3Entity>,
  ) {}

  async saveS3(S3Entity: S3Entity): Promise<S3Entity> {
    return await this.S3Repository.save(S3Entity);
  }

  async createS3(url: string, type: 'audio' | 'photo'): Promise<S3Entity> {
    const S3 = this.S3Repository.create({ url, type });
    return await this.S3Repository.save(S3);
  }

  async findS3ById(S3Id: number): Promise<S3Entity> {
    return this.S3Repository.findOne({ where: { id: S3Id } });
  }

  async findAll(type: 'audio' | 'photo') {
    return this.S3Repository.find({ where: { type } });
  }

  async findOne(id: number): Promise<S3Entity> {
    return this.S3Repository
      .createQueryBuilder('S3')
      .where('S3.id = :id', { id })
      .getOne();
  }
}
