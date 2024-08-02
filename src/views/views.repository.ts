import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { View } from "./entities/view.entity";
import { CreateViewDto } from "./dto/create-view.dto";
import { UpdateViewDto } from "./dto/update-view.dto";

@Injectable()
export class ViewsRepository {
    constructor(@InjectRepository(View)
                private readonly viewRepo:Repository<View>) {}

    async create(data: CreateViewDto) {
        const view = this.viewRepo.create(data)
        return await this.viewRepo.save(view)
    }

    async save(data: CreateViewDto) {
        return await this.viewRepo.save(data)
    }

    async findAll() {
        return await this.viewRepo
                .createQueryBuilder('v')
                .leftJoinAndSelect('v.music', 'music')
                .getMany()
    }

    async findOne(id: number) {
        return await this.viewRepo
                .createQueryBuilder('v')
                .where('v.id = :id', { id })
                .getOne()
    }

    async update(id: number, data: UpdateViewDto) {
        await this.viewRepo
            .createQueryBuilder('v')
            .update()
            .set(data)
            .where('v.id = :id', { id })
            .execute()

        return this.viewRepo
            .createQueryBuilder('v')
            .where('v.id = :id', { id })
            .getOne()
    }

    async remove(id: number) {
        await this.viewRepo.softDelete(id)

        return this.viewRepo
        .createQueryBuilder('v')
        .withDeleted()
        .where('v.id = :id', { id })
        .getOne()
    }

    
}