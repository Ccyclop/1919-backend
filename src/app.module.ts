import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { AlbumModule } from './album/album.module';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username:'root',
    password:'Fircxa@18',
    database:'F2R0C0X5',
    autoLoadEntities:true,
    synchronize: false
  }),
  MusicModule, AuthorsModule,AlbumModule,SearchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
