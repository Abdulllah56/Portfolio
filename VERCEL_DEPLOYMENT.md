# Vercel Deployment Guide for Abdullah's Portfolio

## Current Setup
- Frontend: https://abdullah-developer-portfolio.vercel.app/
- Backend: Will be deployed to a separate Vercel project

## Step 1: Deploy Backend to Vercel

1. **Create a new Vercel project for the backend:**
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy the backend (run this in your project directory)
   vercel --name abdullah-developer-portfolio-backend
   ```

2. **Set Environment Variables in Vercel Dashboard:**
   - Go to https://vercel.com/dashboard
   - Select your backend project
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     EMAIL_USER = your_gmail@gmail.com
     EMAIL_PASS = your_gmail_app_password
     NODE_ENV = production
     FRONTEND_URL = https://abdullah-developer-portfolio.vercel.app
     ```

## Step 2: Update Frontend Configuration

After deploying the backend, you'll get a URL like:
`https://abdullah-developer-portfolio-backend.vercel.app`

Add this script tag to your `index.html` file before the contact-form.js script:

```html
<script>
  window.BACKEND_URL = 'https://abdullah-developer-portfolio-backend.vercel.app';
</script>
```

## Step 3: Redeploy Frontend

After updating the frontend with the backend URL:

```bash
# If you're using Git with Vercel auto-deployment
git add .
git commit -m "Add backend URL configuration"
git push

# Or deploy directly with Vercel CLI
vercel --prod
```

## Alternative: Single Project Deployment

If you prefer to keep everything in one project, you can:

1. **Move all frontend files to a `public` folder**
2. **Update vercel.json to serve both frontend and backend:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

## Testing

1. **Test the backend health endpoint:**
   ```
   https://abdullah-developer-portfolio-backend.vercel.app/api/health
   ```
   Should return: `{"ok": true}`

2. **Test the contact form on your live site:**
   - Go to https://abdullah-developer-portfolio.vercel.app/
   - Fill out and submit the contact form
   - Check for success message and email delivery

## Environment Variables Required

Make sure these are set in your Vercel backend project:

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Gmail App Password (not regular password)
- `NODE_ENV`: Set to "production"
- `FRONTEND_URL`: https://abdullah-developer-portfolio.vercel.app

## Gmail App Password Setup

1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account Settings → Security → 2-Step Verification → App passwords
3. Generate an app password for "Mail"
4. Use this 16-character password in `EMAIL_PASS`

## Troubleshooting

- **CORS errors**: Ensure `FRONTEND_URL` is set correctly in backend environment variables
- **Email not sending**: Verify Gmail App Password is correct and has no spaces
- **404 errors**: Check that the backend URL in frontend matches your deployed backend URL
- **Function timeout**: Vercel has a 10-second timeout for serverless functions

## Commands Summary

```bash
# Deploy backend
vercel --name abdullah-developer-portfolio-backend

# Deploy frontend (if separate)
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```