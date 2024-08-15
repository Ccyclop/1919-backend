import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthRepository } from "./repositories/auth.repository";
import { TokenService } from "./services/token.service";
import { EmailService } from "./services/email.service";
import { User } from "../user/entity/user.entity";
import { Token } from "./entity/token.entity";
import { ResetToken } from "./entity/reset-token.entity";
import { UserModule } from "../user/user.module";
import { UserRepository } from "../user/user.repository";
import { TokenRepository } from "./repositories/token.repository";
import { RsTokenService } from "./services/RsToken.service";
import { RsTokenRepository } from "./repositories/RsToken.repository";
import { TokenController } from "./controllers/token.controller";
import { RsTokenController } from "./controllers/rstoken.controller";

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