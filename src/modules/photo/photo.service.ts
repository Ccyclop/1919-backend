import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PhotoRepository } from './photo.repository';
import { Photo } from './entity/photo.entity';

@Injectable()
export class PhotoService {
  private readonly s3: S3Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly photoRepository: PhotoRepository,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('region'),
      credentials: {
        accessKeyId: this.configService.get<string>('accessKeyId'),
        secretAccessKey: this.configService.get<string>('secretAccessKey'),
      },
    });
  }

  async savePhoto(filename: string, data: Buffer, mimetype: string): Promise<Photo> {
    const uploadParams = {
      Bucket: this.configService.get<string>('bucketName'),
      Key: `photos/${Date.now()}_${filename}`,
      Body: data,
      ContentType: mimetype,
    };

    const uploadResult = await this.s3.send(new PutObjectCommand(uploadParams));
    const photoUrl = `https://${this.configService.get<string>('bucketName')}.s3.${this.configService.get<string>('region')}.amazonaws.com/${uploadParams.Key}`;

    const photo = await this.photoRepository.createPhoto(photoUrl);

    return await this.photoRepository.savePhoto(photo);
  }

    getAll() {
        return this.photoRepository.findAll();
    }
    
    getOne(id:number) {
        return this.photoRepository.findOne(id)
    }
}
