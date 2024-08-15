import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { AuthService } from "./service/auth.service";
import { AuthController } from "./controller/auth.controller";
import { AuthRepository } from "./repository/auth.repository";
import { TokenService } from "./service/token.service";
import { EmailService } from "./service/email.service";
import { User } from "../user/entity/user.entity";
import { Token } from "./entity/token.entity";
import { ResetToken } from "./entity/reset-token.entity";
import { UserModule } from "../user/user.module";
import { UserRepository } from "../user/user.repository";
import { TokenRepository } from "./repository/token.repository";
import { RsTokenService } from "./service/RsToken.service";
import { RsTokenRepository } from "./repository/RsToken.repository";
import { TokenController } from "./controller/token.controller";
import { RsTokenController } from "./controller/rstoken.controller";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([User, Token, ResetToken]),

        forwardRef(() => UserModule),

        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>('Email.HOST', 'localhost'),
                    port: configService.get<number>('EmailP.PORT', 1025),
                    secure: false,
                    auth: null,
                },
                defaults: {
                    from: configService.get<string>('EmailF.FROM', 'novatori@example.com'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        AuthService,
        AuthRepository,
        TokenService,
        EmailService,
        UserRepository,
        TokenRepository,
        RsTokenService,
        RsTokenRepository,
    ],
    controllers: [AuthController, TokenController, RsTokenController],
    exports: [
        AuthService,
        EmailService,
        TokenService,
        RsTokenService,
        TokenRepository
    ],
})
export class AuthModule {}