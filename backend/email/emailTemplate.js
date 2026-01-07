export const emailTemplate = (verifyLink) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
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
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #4f46e5;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
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
    <h2>Verify Your Email</h2>
    <p>
      Thanks for registering! Please click the button below to verify your email address.
    </p>

    <a href="${verifyLink}" class="btn">Verify Email</a>

    <p style="margin-top:20px;">
      This link will expire in <strong>15 minutes</strong>.
    </p>

    <div class="footer">
      <p>If you did not create an account, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;
};
