import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateContactData } from '@/lib/db/schema';

export async function GET() {
  try {
    const contacts = await db.getAllContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate contact data
    const validation = validateContactData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, message, source = 'website' } = body;

    const contact = await db.createContact({
      name,
      email,
      phone,
      company,
      message,
      source,
      status: 'new',
      priority: 'normal',
      responded: false,
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
