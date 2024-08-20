import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Audio } from "./entity/audio.entity";
import { AudioController } from "./audio.controller";
import { AudioRepository } from "./audio.repository";
import { AudioService } from "./audio.service";

@Module({
    imports:[TypeOrmModule.forFeature([Audio])],
    controllers: [AudioController],
    providers: [AudioService,AudioRepository],
    exports: []
})
export class AudioModule {}