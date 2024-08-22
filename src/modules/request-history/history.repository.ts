import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestHistory } from "./entity/request-history";
import { Repository } from "typeorm";

@Injectable()
export class RequestHistoryRepo {
    constructor(
        @InjectRepository(RequestHistory)
        private readonly requestHistoryRepository: Repository<RequestHistory>
    ) {}

    async save(requestHistory : RequestHistory) {
        return await this.requestHistoryRepository.save(requestHistory)
    }

    async findAll(): Promise<RequestHistory[]> {
        return await this.requestHistoryRepository.find(); 
      }
    
    async findOne(requestId:number) {
        return await this.requestHistoryRepository
        .createQueryBuilder('requestHistory')
        .where('requestHistory.id = :id',{requestId})
        .getOne();
    }
}