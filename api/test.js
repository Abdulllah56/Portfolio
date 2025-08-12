export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.status(200).json({ 
      success: true,
      message: 'Serverless function is working!',
      method: req.method,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      nodeVersion: process.version
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Function failed',
      message: error.message,
      stack: error.stack
    });
  }
}