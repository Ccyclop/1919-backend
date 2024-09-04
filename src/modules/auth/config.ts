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
    email: {
      host: process.env.EMAIL_HOST || '',
    },
    emailp: {
      port: process.env.EMAIL_PORT || 587,
    },
    EmailF: {
      from: process.env.EMAIL_FROM || '',
    },

    EmailU: {
      user: process.env.EMAIL_USER
    },

   EmailPassword: {
    password: process.env.EMAIL_PASSWORD
   }
});