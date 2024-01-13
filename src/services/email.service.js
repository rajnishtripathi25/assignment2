const sgMail = require('@sendgrid/mail');
const config = require('../config/config');
const logger = require('../config/logger');
const {
  loginOtpEmailTemplate,
  saveForLaterDetailTemplate,
} = require('../utils/emailTemplates');
const redisService = require('./redis.service');
const { otpMessages } = require('../config/httpMessages');

sgMail.setApiKey(config.email.sendgrid.apiKey);
const devOtp = config.devLoginOtp;

const sendEmail = async ({
  from = {},
  to = '',
  subject = '',
  text = '',
  html = '',
}) => {
  const defaultFrom = {
    name: config.email.fromName,
    email: config.email.fromEmail,
  };

  const msg = {
    from: { ...defaultFrom, ...from },
    to,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    logger.error(`Error sending email: ${err.message}`);
    throw err;
  }
};

const sendVerificationEmail = async ({ to: key, user }) => {
  try {
    let otpData = await redisService.getOtpData({ key });
    const otp =
      config.env === 'production' ? redisService.generateOtp() : devOtp;

    if (!otpData) {
      otpData = {
        otp,
        resendCount: 0,
        attemptCount: 0,
      };
    } else {
      otpData.otp = otp;
      await redisService.incrementResendCount({ key, otpData });
    }

    await redisService.storeOtp({
      key,
      ...otpData,
    });

    if (config.env === 'production') {
      const message = {
        to: key,
        subject: 'OTP Login Confirmation',
        text: `Your OTP code`,
        html: loginOtpEmailTemplate({ otp: otpData.otp, name: user.name }),
      };

      await sendEmail(message);
    }

    return otpMessages.OTP_SUCCESS;
  } catch (err) {
    logger.error(`Error sending verification email: ${err.message}`);
    throw err;
  }
};

const saveForLaterDetailEmail = async ({ to, user }) => {
  const message = {
    to,
    subject: 'Welcome to Our Service!',
    text: `Hi ${user.name}, welcome to our service.`,
    html: saveForLaterDetailTemplate({ name: user.name }),
  };

  await sendEmail(message);
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  saveForLaterDetailEmail,
};
