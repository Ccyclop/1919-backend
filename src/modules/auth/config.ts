import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({

    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
    
    jwtSTR: {
      secret: process.env.STRATEGY_SECRET || '',
    },
    // jwtRT: {
    //   secret: process.env.RT_SECRET || ''
    // },
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