import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { ViewsRepository } from './views.repository';

@Injectable()
export class ViewsService {

  constructor(private readonly viewRepo: ViewsRepository) {}

  create(createViewDto: CreateViewDto) {
    return this.viewRepo.create(createViewDto);
  }

  findAll() {
    return this.viewRepo.findAll();
  }

  findOne(id: number) {
    return this.viewRepo.findOne(id);
  }

  update(id: number, updateViewDto: UpdateViewDto) {
    return this.viewRepo.update(id, updateViewDto);
  }

  remove(id: number) {
    return this.viewRepo.remove(id);
  }
}
