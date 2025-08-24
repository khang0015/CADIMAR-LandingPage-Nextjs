import { NextRequest, NextResponse } from 'next/server';

// Proxy requests to backend API
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const params = await context.params;
    const { id } = params;
    const backendUrl = `${BACKEND_URL}/api/contacts/${id}/respond`;
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      { error: 'Failed to mark contact as responded' },
      { status: 500 }
    );
  }
}
