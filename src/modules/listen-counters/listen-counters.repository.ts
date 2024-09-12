import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListenCounterEntity } from "./entities/listen-counter.entity";
import { Repository } from "typeorm";
import { CreateListenCounterDto } from "./dto/create-listen-counter.dto";

@Injectable()
export class ListenCounterRepository {

    constructor(@InjectRepository(ListenCounterEntity)
                private readonly listenCounterRepo: Repository<ListenCounterEntity>) {}

    async create(data: CreateListenCounterDto) {
        const listenCounter = this.listenCounterRepo.create(data)
        return await this.listenCounterRepo.save(listenCounter)
    } 

}