export const emailOTPTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
    }
    .otp-box {
      margin: 20px auto;
      padding: 15px;
      font-size: 28px;
      letter-spacing: 6px;
      font-weight: bold;
      color: #4f46e5;
      background-color: #eef2ff;
      border-radius: 6px;
      display: inline-block;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Email Verification OTP</h2>

    <p>
      Use the OTP below to verify your email address.
    </p>

    <div class="otp-box">
      ${otp}
    </div>

    <p style="margin-top:20px;">
      This OTP will expire in <strong>10 minutes</strong>.
    </p>

    <div class="footer">
      <p>If you did not request this, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;
};
