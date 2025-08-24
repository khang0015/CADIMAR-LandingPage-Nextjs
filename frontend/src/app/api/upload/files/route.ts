import { NextRequest, NextResponse } from 'next/server';

// Proxy requests to backend API
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'blog';
    
    const backendUrl = `${BACKEND_URL}/api/upload/files?type=${type}`;
    console.log('Fetching files from:', backendUrl);
    
    const response = await fetch(backendUrl);
    const data = await response.json();
    
    console.log('Backend response:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}
