import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://abdullah-developer-portfolio.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s+/g, ''),
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter
    await transporter.verify();

    // Email to site owner
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: subject ? `[Portfolio] ${subject}` : '[Portfolio] New contact form submission',
      text: `You have a new contact form submission.

Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `Muhammad Abdullah <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting me!',
      text: `Hi ${name},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

Here's a summary of your message:
Subject: ${subject || 'N/A'}

Message:
${message}

Best regards,
Muhammad Abdullah`,
      html: `
        <h3>Thank you for contacting me!</h3>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
        
        <h4>Summary of your message:</h4>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <p>Best regards,<br>Muhammad Abdullah</p>
      `
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('Email send error:', error);
    
    // Return specific error messages
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        error: 'Email authentication failed. Please check your credentials.' 
      });
    }
    
    if (error.code === 'ENOTFOUND') {
      return res.status(500).json({ 
        error: 'Email server not found. Please try again later.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later.',
      details: error.message
    });
  }
}