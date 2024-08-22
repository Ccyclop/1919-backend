import { Injectable } from '@nestjs/common';
import { RequestHistoryRepo } from './history.repository';
import { RequestHistory } from './entity/request-history';

@Injectable()
export class RequestHistoryService {
  constructor(
    private readonly requestHistoryRepository: RequestHistoryRepo,
  ) {}

  async logAction(action: string, details: string): Promise<void> {
    const requestHistory = new RequestHistory();
    requestHistory.action = action;
    requestHistory.details = details;
    await this.requestHistoryRepository.save(requestHistory);
  }


  async findAll(): Promise<RequestHistory[]> {
    return this.requestHistoryRepository.findAll();
  }

  
  async findOne(id: number): Promise<RequestHistory> {
    return this.requestHistoryRepository.findOne(id);
  }
}