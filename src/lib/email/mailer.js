import nodemailer from "nodemailer";

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

/**
 * Send email
 */
export async function sendEmail({ to, subject, html, text }) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);
    throw new Error("Failed to send email");
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email, resetToken) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); background-color: #667eea; color: #ffffff !important; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You recently requested to reset your password for your BooksExchange account. Click the button below to reset it:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button" style="color: #ffffff !important;">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
            <p>Best regards,<br>The BooksExchange Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} BooksExchange. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
    Reset Your Password
    
    You recently requested to reset your password for your BooksExchange account.
    
    Click the link below to reset it:
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request a password reset, you can safely ignore this email.
    
    Best regards,
    The BooksExchange Team
  `;

  return await sendEmail({
    to: email,
    subject: "Reset Your Password - BooksExchange",
    html,
    text,
  });
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(email, name) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); background-color: #667eea; color: #ffffff !important; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📚 Welcome to BooksExchange!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Welcome to BooksExchange! We're excited to have you join our community of book lovers.</p>
            <p>With BooksExchange, you can:</p>
            <ul>
              <li>📖 Discover and exchange books with other readers</li>
              <li>💬 Join discussions about your favorite books</li>
              <li>🗺️ Find physical exchange points near you</li>
              <li>📜 Track every book's journey through QR codes</li>
            </ul>
            <div style="text-align: center;">
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL
              }/marketplace" class="button" style="color: #ffffff !important;">Start Exploring</a>
            </div>
            <p>Happy reading!</p>
            <p>Best regards,<br>The BooksExchange Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} BooksExchange. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
    Welcome to BooksExchange!
    
    Hi ${name},
    
    Welcome to BooksExchange! We're excited to have you join our community of book lovers.
    
    With BooksExchange, you can:
    - Discover and exchange books with other readers
    - Join discussions about your favorite books
    - Find physical exchange points near you
    - Track every book's journey through QR codes
    
    Visit ${process.env.NEXT_PUBLIC_APP_URL}/marketplace to start exploring!
    
    Happy reading!
    
    Best regards,
    The BooksExchange Team
  `;

  return await sendEmail({
    to: email,
    subject: "Welcome to BooksExchange! 📚",
    html,
    text,
  });
}
