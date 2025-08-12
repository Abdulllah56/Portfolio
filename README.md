# Portfolio Contact Form Backend

A Node.js/Express backend service for handling contact form submissions with email notifications.

## Features

- Contact form processing
- Email notifications to site owner
- Confirmation emails to users
- CORS support for cross-origin requests
- Production-ready deployment configuration

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your email credentials:
   ```
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   NODE_ENV=development
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will run on `http://localhost:3001`

## Deployment Options

### 1. Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set EMAIL_USER=your_gmail@gmail.com
   heroku config:set EMAIL_PASS=your_gmail_app_password
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-frontend-domain.com
   ```
5. Deploy: `git push heroku main`

### 2. Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Set environment variables in Vercel dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NODE_ENV=production`
   - `FRONTEND_URL`

### 3. Railway

1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

### 4. Google Cloud Platform

1. Install Google Cloud SDK
2. Deploy: `gcloud app deploy`
3. Set environment variables in GCP console

## Environment Variables

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Gmail App Password (not regular password)
- `NODE_ENV`: Set to 'production' for deployment
- `FRONTEND_URL`: Your frontend domain (for CORS)
- `PORT`: Server port (automatically set by most platforms)

## Frontend Integration

Update your frontend's backend URL:

```javascript
// In your HTML file, before loading contact-form.js:
<script>
  window.BACKEND_URL = 'https://your-backend-domain.herokuapp.com';
</script>
```

Or the contact-form.js will auto-detect production environments.

## Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## CORS Configuration

The server is configured to accept requests from:
- Local development: `localhost:3000`, `127.0.0.1:5500/5501`
- Production: Domains specified in `FRONTEND_URL` environment variable

## Security Notes

- Never commit `.env` file to version control
- Use App Passwords, not regular Gmail passwords
- Configure CORS properly for production
- The `rejectUnauthorized: false` TLS setting is only for local development behind corporate proxies