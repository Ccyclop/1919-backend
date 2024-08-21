import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3Repository } from './S3.repository';
import { S3Entity } from './entity/S3.entity';
import { S3HistoryService } from '../media-history/S3-history.service';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly S3Repository: S3Repository,
    private readonly S3HistoryService : S3HistoryService
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('region'),
      credentials: {
        accessKeyId: this.configService.get<string>('accessKeyId'),
        secretAccessKey: this.configService.get<string>('secretAccessKey'),
      },
    });
  }

  async saveS3(filename: string, data: Buffer, mimetype: string, type: 'audio' | 'photo'): Promise<S3Entity> {
    const keyPrefix = type === 'photo' ? 'photos' : 'audios';
    const uploadParams = {
      Bucket: this.configService.get<string>('bucketName'),
      Key: `${keyPrefix}/${Date.now()}_${filename}`,
      Body: data,
      ContentType: mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));
    const S3Url = `https://${this.configService.get<string>('bucketName')}.s3.${this.configService.get<string>('region')}.amazonaws.com/${uploadParams.Key}`;

    await this.S3HistoryService.logAction(
      S3Url, 
      uploadParams.Key, 
      uploadParams.Bucket
      
    );

    const s3 = await this.S3Repository.createS3(S3Url, type);
    return await this.S3Repository.saveS3(s3);
  }

  async getAll(type: 'audio' | 'photo'): Promise<S3Entity[]> {
    return this.S3Repository.findAll(type);
  }

  async getOne(id: number): Promise<S3Entity> {
    return this.S3Repository.findOne(id);
  }
}