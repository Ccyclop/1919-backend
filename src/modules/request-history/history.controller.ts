import { Controller, Get, Param } from '@nestjs/common';
import { RequestHistoryService } from './history.service';
import { PublicRoute } from '../auth/decorators/admin.decorator';

@Controller('request-history')
export class RequestHistoryController {
  constructor(private readonly requestHistoryService: RequestHistoryService) {}

  @PublicRoute()
  @Get()
  async getAllRequestHistory() {
    return this.requestHistoryService.findAll();
  }

  @Get(':id')
  async getRequestHistoryById(@Param('id') id: number) {
    return this.requestHistoryService.findOne(id);
  }
}