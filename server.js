const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your name, email, and message.'
    });
  }

  const senderEmail = process.env.SMTP_USER || process.env.SMTP_FROM;
  const smtpHost = process.env.SMTP_HOST;

  if (smtpHost && senderEmail && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: senderEmail,
        replyTo: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      });

      return res.status(200).json({
        success: true,
        message: 'Your message was sent successfully. Thanks for reaching out!'
      });
    } catch (error) {
      console.error('SMTP send failed:', error);
      return res.status(500).json({
        success: false,
        message: 'The message could not be sent right now. Please try again later.'
      });
    }
  }

  console.log('Demo contact submission:', { name, email, message });
  return res.status(200).json({
    success: true,
    message: 'Your message was received in demo mode. Connect SMTP env vars for live email delivery.'
  });
});

app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found.'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
