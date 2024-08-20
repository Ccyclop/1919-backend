import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AudioRepository } from './audio.repository';
import { Audio } from './entity/audio.entity';

@Injectable()
export class AudioService {
  private readonly s3: S3Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly audioRepository: AudioRepository,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('region'),
      credentials: {
        accessKeyId: this.configService.get<string>('accessKeyId'),
        secretAccessKey: this.configService.get<string>('secretAccessKey'),
      },
    });
  }

  async saveAudio(filename: string, data: Buffer, mimetype: string): Promise<Audio> {
    const uploadParams = {
      Bucket: this.configService.get<string>('bucketName'),
      Key: `photos/${Date.now()}_${filename}`,
      Body: data,
      ContentType: mimetype,
    };

    const uploadResult = await this.s3.send(new PutObjectCommand(uploadParams));
    const audioUrl = `https://${this.configService.get<string>('bucketName')}.s3.${this.configService.get<string>('region')}.amazonaws.com/${uploadParams.Key}`;

    const audio = await this.audioRepository.createAudio(audioUrl);

    return await this.audioRepository.saveAudio(audio);
  }

    getAll() {
        return this.audioRepository.findAll();
    }
    
    getOne(id:number) {
        return this.audioRepository.findOne(id)
    }
}
