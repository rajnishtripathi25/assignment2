const saveForLaterDetailTemplate = ({ name = '' }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Client Registration Confirmation</title>
  <style>
    body {
      font-family: Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }

    .container {
      min-width: 600px;
      max-width: 80%;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    img {
      width: 56px;
    }

    h1 {
      margin: 10px 0;
    }

    p {
      margin: 10px 0;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      background-color: #00466a;
      color: #ffffff;
      border-radius: 5px;
    }

    .footer {
      color: #999999;
      text-align: center;
      padding: 8px 0;
      color: #aaa;
      font-size: 0.8em;
      line-height: 1;
      font-weight: 300
    }
  </style>
</head>

<body>
  <div class="container">
    <div style="color: #000; text-align: left;">
      <p>Hello ${customerName},</p>
      <p>Great news! Your recent exploration of our packages and dishes on Blast Catering has been saved. You can pick up right where you left off.</p>
      <p>Simply click the button below to access your selections:</p>
      <a href="[Insert Access Link]" class="button">Access My Selections</a>
      <p>Have questions or need assistance? Feel free to reach out. We're here to help.</p>
      <p>Thank you for choosing Blast Catering.</p>
      <p>Best Regards,<br>The Blast Catering Team</p>
    </div>    
  </div>
</body>
</html>
`;

const loginOtpEmailTemplate = ({ otp, name = '' }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login OTP Verification</title>
  <style>
    body {
      font-family: Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }

    .container {
      min-width: 600px;
      max-width: 80%;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    img {
      width: 56px;
    }

    h1 {
      margin: 10px 0;
    }

    p {
      margin: 10px 0;
    }

    strong {
      font-size: 130%;
    }

    .footer {
      color: #999999;
      text-align: center;
      padding: 8px 0;
      color: #aaa;
      font-size: 0.8em;
      line-height: 1;
      font-weight: 300
    }
  </style>
</head>

<body>
  <div class="container">
    <div style="color: #000; text-align: left;">
      <p>Dear ${name},</p>
      <p>Welcome to Blast Catering!</p>
      <p>Your One-Time Passcode (OTP): <strong>${otp}</strong></p>
      <p>This OTP is valid for single use and will expire shortly. Please use it to complete your login process on the Blast Catering platform.</p>
      <p>If you haven't attempted to log in or requested this OTP, please contact our team immediately.</p>
      <p>Best Regards,<br>The Blast Catering Team</p>
    </div>    
  </div>
</body>
</html>
`;

module.exports = { saveForLaterDetailTemplate, loginOtpEmailTemplate };
