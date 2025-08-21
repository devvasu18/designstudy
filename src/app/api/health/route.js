import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      user: '/api/user',
      stats: '/api/stats',
      stories: '/api/stories', 
      discover: '/api/discover'
    }
  });
}
