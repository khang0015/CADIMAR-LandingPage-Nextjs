import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');

    let translations;
    if (lang) {
      translations = await db.getTranslationsByLang(lang);
    } else {
      translations = await db.getAllTranslations();
    }

    // Convert to key-value object for frontend
    if (lang) {
      const translationMap: Record<string, string> = {};
      translations.forEach(t => {
        translationMap[t.key] = t.value;
      });
      return NextResponse.json(translationMap);
    }

    return NextResponse.json(translations);
  } catch (error) {
    console.error('Error fetching translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lang, key, value, category } = body;

    if (!lang || !key || !value) {
      return NextResponse.json(
        { error: 'Missing required fields: lang, key, value' },
        { status: 400 }
      );
    }

    const translation = await db.createTranslation({
      lang,
      key,
      value,
      category,
    });

    return NextResponse.json(translation, { status: 201 });
  } catch (error) {
    console.error('Error creating translation:', error);
    return NextResponse.json(
      { error: 'Failed to create translation' },
      { status: 500 }
    );
  }
}
