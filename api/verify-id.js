// POST /api/verify-id
// This endpoint proxies license verification requests to RealID
// Your secret key stays on the server — never exposed to the client
//
// After your RealID call, replace the placeholder with your actual keys:
//   REALID_API_KEY  → set in Vercel Environment Variables
//   REALID_API_URL  → set in Vercel Environment Variables

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { frontImageBase64, backImageBase64 } = req.body;

  if (!frontImageBase64 || !backImageBase64) {
    return res.status(400).json({ error: 'Front and back images are required' });
  }

  const API_KEY = process.env.REALID_API_KEY;
  const API_URL = process.env.REALID_API_URL || 'https://api.realid.com/v1/verify';

  if (!API_KEY) {
    return res.status(500).json({ error: 'REALID_API_KEY not configured' });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        frontImageBase64,
        backImageBase64,
        // Add additional RealID params here after your call
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Verification failed', 
        details: data 
      });
    }

    // Return parsed identity data to the client
    return res.status(200).json({
      success: true,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        licenseNumber: data.licenseNumber,
        expirationDate: data.expirationDate,
        address: data.address,
        state: data.state,
        trustScore: data.trustScore,
      }
    });
  } catch (error) {
    console.error('RealID verification error:', error);
    return res.status(500).json({ error: 'Verification service unavailable' });
  }
}
