export const resetPasswordHTML = (resetLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        /* Similar styles to verificationHTML */
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>It seems like you requested a password reset. Click the button below to reset your password.</p>
            <a href="${resetLink}" class="verify-button">Reset Password</a>
            <p>If you didn’t request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>© 2024 Ping. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
