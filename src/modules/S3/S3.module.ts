import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { S3Entity } from "./entity/S3.entity";
import { S3Controller } from "./S3.controller";
import { S3Repository } from "./S3.repository";
import { S3Service } from "./S3.service";
import { S3History} from "../S3-history/entity/S3-history.entity";
import { S3HistoryService } from "../S3-history/S3-history.service";
import { S3HistoryModule } from "../S3-history/S3-history.module";
import { Album } from "../album/entities/album.entity";


@Module({
    imports:[TypeOrmModule.forFeature([S3Entity,S3History]),
    S3HistoryModule

    ],
    controllers: [S3Controller],
    providers: [S3Repository,S3Service,S3HistoryService],
    exports: [S3Repository,S3Service]
})
export class S3Module {}