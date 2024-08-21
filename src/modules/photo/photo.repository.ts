import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Photo } from "./entity/photo.entity";
import { Repository } from "typeorm";

@Injectable()
export class PhotoRepository {
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>
    
  async savePhoto(photo: Photo): Promise<Photo> {
    return await this.photoRepository.save(photo);
  }

  async createPhoto(url: string): Promise<Photo> {
    const photo = this.photoRepository.create({ url });
    return await this.photoRepository.save(photo);
  }

  async findPhotoById(photoId: number): Promise<Photo> {
    return this.photoRepository.findOne({ where: { id: photoId } });
  }

  async findAll() {
    return this.photoRepository.find();
  }

    async findOne(id:number) {
        return this.photoRepository
            .createQueryBuilder('photo')
            .where('photo.id = :id', {id})
            .getOne()
    }

 
}