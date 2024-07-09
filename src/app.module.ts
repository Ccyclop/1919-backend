import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicsModule } from './musics/musics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username:'root',
    password:'',
    database:'1919-database',
    autoLoadEntities:true,
    synchronize: true
  }),MusicsModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
