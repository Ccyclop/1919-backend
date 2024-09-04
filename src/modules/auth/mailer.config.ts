import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as AWS from 'aws-sdk';

export const createMailerOptions = async (configService: ConfigService): Promise<MailerOptions> => {
  const ses = new AWS.SES({
    region: configService.get<string>('region'),
    accessKeyId: configService.get<string>('accessKeyId'),
    secretAccessKey: configService.get<string>('secretAccessKey'),
  });

  return {
    transport: {
      SES: ses,
    },
    defaults: {
      from: 'giorgi.pirtskhalaishvili.18@gmail.com',
    },
  };
};