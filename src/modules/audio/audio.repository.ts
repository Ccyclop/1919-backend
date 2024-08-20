import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Audio } from "./entity/audio.entity";
import { Repository } from "typeorm";

@Injectable()
export class AudioRepository {
    @InjectRepository(Audio)
    private readonly audioRepository: Repository<Audio>
    
  async saveAudio(audio: Audio): Promise<Audio> {
    return await this.audioRepository.save(audio);
  }

  async createAudio(url: string): Promise<Audio> {
    const audio = this.audioRepository.create({ url });
    return await this.audioRepository.save(audio);
  }

  async findaudioById(audioId: number): Promise<Audio> {
    return this.audioRepository.findOne({ where: { id: audioId } });
  }

  async findAll() {
    return this.audioRepository.find();
  }

    async findOne(id:number) {
        return this.audioRepository
            .createQueryBuilder('audio')
            .where('audio.id = :id', {id})
            .getOne()
    }

 
}