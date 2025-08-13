export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    hasEmailConfig: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    nodeVersion: process.version,
    service: 'Abdullah Portfolio API'
  });
}