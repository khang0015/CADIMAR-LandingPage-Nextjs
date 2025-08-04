import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const languages = await db.getActiveLanguages();
    return NextResponse.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, name, nativeName, flag, isActive = true, sortOrder = 0 } = body;

    if (!code || !name || !nativeName) {
      return NextResponse.json(
        { error: 'Missing required fields: code, name, nativeName' },
        { status: 400 }
      );
    }

    const language = await db.createLanguage({
      code,
      name,
      nativeName,
      flag: flag || '',
      isActive,
      sortOrder,
    });

    return NextResponse.json(language, { status: 201 });
  } catch (error) {
    console.error('Error creating language:', error);
    return NextResponse.json(
      { error: 'Failed to create language' },
      { status: 500 }
    );
  }
}
