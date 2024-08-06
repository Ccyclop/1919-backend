import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";
import { Token } from "./entities/token.entity";
import { UserModule } from "../user/user.module";
import { TokenRepository } from "./token.repository";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { User } from "../user/entity/user.entity";
import { ResetToken } from "../reset-token/entities/reset-token.entity";
import { RsTokenModule } from "../reset-token/RsToken.module";
import { AuthModule } from "../auth/auth.module";
import { UserRepository } from "../user/user.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
              return {
                secret: configService.get<string>('jwtAT.secret'),
              };
            },
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Token,User,ResetToken]),
        forwardRef(() => UserModule),
        forwardRef(() => RsTokenModule),
        forwardRef(() => AuthModule),

    ],
    controllers:[TokenController],
    providers: [TokenService,TokenRepository,UserRepository,JwtService],
    exports:[TokenService,TokenRepository,JwtModule]
})
export class TokenModule {}
