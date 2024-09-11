import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3Repository } from './S3.repository';
import { S3Entity } from './entity/S3.entity';
import { S3HistoryService } from '../S3-history/S3-history.service';
import { S3Type } from './enum/S3.enum';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly S3Repository: S3Repository,
    private readonly S3HistoryService : S3HistoryService,
    private readonly userRepository : UserRepository
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('region'),
      credentials: {
        accessKeyId: this.configService.get<string>('accessKeyId'),
        secretAccessKey: this.configService.get<string>('secretAccessKey'),
      },
    });
  }

  async saveS3(filename: string, data: Buffer, mimetype: string, type: S3Type,userId:number): Promise<S3Entity> {
    const keyPrefix = type === 'photo' ? 'photos' : 'audios';
    const uploadParams = {
      Bucket: this.configService.get<string>('bucketName'),
      Key: `${keyPrefix}/${Date.now()}_${filename}`,
      Body: data,
      ContentType: mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));
    const S3Url = `https://${this.configService.get<string>('bucketName')}.s3.${this.configService.get<string>('region')}.amazonaws.com/${uploadParams.Key}`;

    const user = await this.userRepository.findById(userId)
    await this.S3HistoryService.logAction(
      S3Url, 
      uploadParams.Key, 
      uploadParams.Bucket,
      userId,
      user
      
    );

    const s3 = await this.S3Repository.createS3(S3Url, type,mimetype);
    return await this.S3Repository.saveS3(s3);
  }

  async getAll(type: S3Type): Promise<S3Entity[]> {
    return this.S3Repository.findAll(type);
  }

  async getOne(id: number): Promise<S3Entity> {
    return this.S3Repository.findOne(id);
  }
}