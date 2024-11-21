export const verificationHTML = (verificationLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #1a1b25;
            margin: 0;
            padding: 0;
            color: #d1d5db;
        }
        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background: #2a2b38;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        .header {
            background-color: #3b3c49;
            color: #fbbf24;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 15px 0;
        }
        .verify-button {
            display: inline-block;
            padding: 12px 20px;
            margin: 20px auto;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
            background-color: #6366f1;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.1s ease;
        }
        .verify-button:hover {
            background-color: #857fcf;
        }
        .footer {
            background-color: #1f2028;
            color: #9ca3af;
            text-align: center;
            padding: 10px 20px;
            font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
            .content p {
                font-size: 14px;
            }
            .verify-button {
                padding: 10px 18px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Verify Your Email</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>Thank you for joining us! Click the button below to verify your email and get started.</p>
            <a href="${verificationLink}" class="verify-button">Verify Email</a>
            <p>If you didn’t request this email, you can safely ignore it.</p>
        </div>
        <div class="footer">
            <p>© 2024 Ping. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
