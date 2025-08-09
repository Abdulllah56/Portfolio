const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // ✅ load .env variables

const app = express();
const PORT = 5502;
const HOST = '127.0.0.1';

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.post('/', async (req, res) => {
  console.log('POST / hit!');
  console.log('Contact form received:', req.body);

  const { name, subject,email, message } = req.body;

  // Email transporter setup
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,      // yourgmail@gmail.com
      pass: process.env.EMAIL_PASS       // your app password
    },
    tls: {
      // Do not fail on invalid certificates
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\n Subject:${subject}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from:process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      text: `Dear ${name},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

Here's a copy of your message:
Subject: ${subject}

Message:
${message}

Best regards,
Abdullah`,
    };

    await transporter.sendMail(confirmationMailOptions);

    res.json({ status: 'success', message: 'Message received and confirmation email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send email.' });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Backend server running at http://${HOST}:${PORT}`);
});
