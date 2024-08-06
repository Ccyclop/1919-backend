import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './auth-module/common/config/config';
import { UserModule } from './auth-module/user/user.module';
import { AtStrategy, RtStrategy } from './auth-module/common/strategies';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { AdminGuard } from './auth-module/common/guards/admin.guard';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from './auth-module/token/token.module';
import { RsTokenModule } from './auth-module/reset-token/RsToken.module';
import { AuthModule } from './auth-module/auth/auth.module';
import { PlaylistMoulde } from './modules/playlist/playlist.module';
import { AlbumModule } from './modules/album/album.module';
import { MusicsModule } from './modules/musics/musics.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { SearchModule } from './modules/search/search.module';

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
        secret: configService.get<string>('jwtAT.secret'),
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
      synchronize: false,
    }),
    UserModule,
    TokenModule,
    RsTokenModule,
    AuthModule,
    PlaylistMoulde,
    AlbumModule,
    MusicsModule,
    AuthorsModule,
    SearchModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
    Reflector,
    AtStrategy,
    RtStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('*');
  }
}