const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    DEV_LOGIN_OTP: Joi.number().default(111111),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    ALLOWED_ORIGINS: Joi.string().required().description('frontend urls'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(60)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    EMAIL_FROMNAME: Joi.string().description('name of sender'),
    EMAIL_FROMEMAIL: Joi.string().description(
      'the from field in the emails sent by the app'
    ),
    SEND_GRID_API_KEY: Joi.string()
      .required()
      .description('sent_grid secret key'),
    PHONE_NUMBER_FROM: Joi.string().description(
      'the from field in the phone number sent by the app'
    ),
    TWILIO_ACCOUNT_SID: Joi.string()
      .required()
      .description('twilio account sid'),
    TWILIO_AUTH_TOKEN: Joi.string().required().description('twilio auth token'),
    TWILIO_SERVICE_SID: Joi.string()
      .required()
      .description('twilio service sid'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_HOST: Joi.string().required().description('redis server url'),
    REDIS_ACC_PASSWORD: Joi.string()
      .required()
      .description('redis acc password'),
    MAX_OTP_ATTEMPTS: Joi.number().default(3),
    MAX_OTP_RESENDS: Joi.number().default(3),
    OTP_EXPIRATION_TIME: Joi.number().default(120),
    ENABLE_LOGGER: Joi.boolean()
      .default(false)
      .description('enable or disble audit logger'),
    ALLOWED_REQUEST_TYPES_TO_LOG: Joi.string()
      .default('all')
      .description('Comma-separated list of allowed request types to log'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const allowedRequestTypes = envVars.ALLOWED_REQUEST_TYPES_TO_LOG.split(',');

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  devLoginOtp: envVars.DEV_LOGIN_OTP,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {},
  },
  allowedOrigins: envVars.ALLOWED_ORIGINS.split(','),
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    sendgrid: {
      apiKey: envVars.SEND_GRID_API_KEY,
    },
    fromName: envVars.EMAIL_FROMNAME,
    fromEmail: envVars.EMAIL_FROMEMAIL,
  },
  sms: {
    twilio: {
      accountSid: envVars.TWILIO_ACCOUNT_SID,
      authToken: envVars.TWILIO_AUTH_TOKEN,
      serviceSid: envVars.TWILIO_SERVICE_SID,
    },
    from: envVars.PHONE_NUMBER_FROM,
  },
  redis: {
    port: envVars.REDIS_PORT,
    host: envVars.REDIS_HOST,
    password: envVars.REDIS_ACC_PASSWORD,
    maxOtpAttempts: envVars.MAX_OTP_ATTEMPTS,
    maxOtpResends: envVars.MAX_OTP_RESENDS,
    otpExpirationTime: envVars.OTP_EXPIRATION_TIME,
  },
  logger: {
    enable: envVars.ENABLE_LOGGER,
    allowedRequestTypes: allowedRequestTypes,
  },
  awsCredential: {
    accessKeyId: envVars.ACCESS_KEY_ID,
    secretAccessKey: envVars.SECRET_ACCESS_KEY,
  },
};
