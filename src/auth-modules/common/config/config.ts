import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
    jwtAT: {
      secret: process.env.AT_SECRET || '',
    },
    jwtRT: {
      secret: process.env.RT_SECRET || ''
    },
    Email: {
      host: process.env.EMAIL_HOST || '',
    },
    EmailP: {
      port: process.env.EMAIL_PORT || 1025,
    },
    EmailF: {
      from: process.env.EMAIL_FROM || '',
    }
});