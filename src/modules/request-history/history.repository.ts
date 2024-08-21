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

    save(requestHistory : RequestHistory) {
        return this.requestHistoryRepository.save(requestHistory)
    }

    async findAll(): Promise<RequestHistory[]> {
        return this.requestHistoryRepository.find(); 
      }
    
    findOne(requestId:number) {
        return this.requestHistoryRepository
        .createQueryBuilder('requestHistory')
        .where('requestHistory.id = :id',{requestId})
        .getOne();
    }
}