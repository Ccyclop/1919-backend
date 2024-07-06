import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicsModule } from './musics/musics.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username:'root',
    password:'',
    database:'1919-database',
    autoLoadEntities:true,
    synchronize: false
    // ცოტახნით გამოვრთავ სანამ გადაბმებს გავაკეთებ მაინც რავიცი...
  }),MusicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
