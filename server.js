import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for production and development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://abdullah-developer-portfolio.vercel.app',
        process.env.FRONTEND_URL,
        'https://vercel.app'
      ]
    : ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://localhost:5500'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}

function createTransport() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS in environment');
  }

  // Use direct Gmail SMTP with TLS. The tls.rejectUnauthorized=false is only for local dev behind intercepting proxies.
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass: String(pass).replace(/\s+/g, ''),
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }

  try {
    const transporter = createTransport();

    // Email to site owner
    const ownerMail = await transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: subject ? `[Portfolio] ${subject}` : '[Portfolio] New contact form submission',
      text: `You have a new contact form submission.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
    });

    // Confirmation email to user
    const confirmMail = await transporter.sendMail({
      from: `Muhammad Abdullah <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'We received your message',
      text: `Hi ${name},\n\nThanks for reaching out! I have received your message and will get back to you soon.\n\nSummary of your message:\nSubject: ${subject || 'N/A'}\n\n${message}\n\nRegards,\nMuhammad Abdullah`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email', details: err?.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Contact form server running on port ${PORT}`);
});