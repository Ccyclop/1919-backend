import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from './entities/view.entity';
import { Music } from 'src/musics/entities/music.entity';
import { ViewsRepository } from './views.repository';

@Module({
  imports: [TypeOrmModule.forFeature([View, Music])],
  controllers: [ViewsController],
  providers: [ViewsService, ViewsRepository],
  exports: [ViewsRepository]
})
export class ViewsModule {}
