import { NextRequest, NextResponse } from 'next/server';
import { create, getAll } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, eventTitle, name, rollNoDept, email, phone } = body;

    if (!eventId || !name || !rollNoDept || !email) {
      return NextResponse.json(
        { success: false, error: 'eventId, name, rollNoDept, and email are required.' },
        { status: 400 }
      );
    }

    const registration = {
      eventId,
      eventTitle: eventTitle || '',
      name: name.trim(),
      rollNoDept: rollNoDept.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      createdAt: new Date().toISOString(),
    };

    create('registrations', registration);

    return NextResponse.json({ success: true, message: 'Registration submitted successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required.' }, { status: 400 });
    }
    const { remove } = await import('@/lib/store');
    const deleted = remove('registrations', id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Registration not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Registration deleted.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const registrations = getAll<any>('registrations', (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ success: true, data: registrations });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
