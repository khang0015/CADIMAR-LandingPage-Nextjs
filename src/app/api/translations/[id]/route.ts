import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = params;

    const translation = await db.updateTranslation(id, body);
    
    if (!translation) {
      return NextResponse.json(
        { error: 'Translation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(translation);
  } catch (error) {
    console.error('Error updating translation:', error);
    return NextResponse.json(
      { error: 'Failed to update translation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleted = await db.deleteTranslation(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Translation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting translation:', error);
    return NextResponse.json(
      { error: 'Failed to delete translation' },
      { status: 500 }
    );
  }
}
