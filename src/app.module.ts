import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './modules/auth/config';
import { UserModule } from './modules/user/user.module';
import { AtStrategy, RtStrategy } from './modules/auth/strategies';
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guards/role.guard';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { PlaylistMoulde } from './modules/playlist/playlist.module';
import { AlbumModule } from './modules/album/album.module';
import { MusicsModule } from './modules/musics/musics.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { SearchModule } from './modules/search/search.module';
import { UserGuard } from './modules/auth/guards/user.guard';
import { AtGuard } from './modules/auth/guards';
import {  S3Module,  } from './modules/S3/S3.module';
import {  S3History } from './modules/S3-history/entity/S3-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSTR.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PlaylistMoulde,
    AlbumModule,
    MusicsModule,
    AuthorsModule,
    SearchModule,
    S3Module,
    S3History
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard 
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },


    Reflector,
    AtStrategy,
    RtStrategy,
  ],
})
export class AppModule  {

  
}