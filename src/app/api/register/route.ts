import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { create, getAll } from '@/lib/store';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const registrationSchema = z.object({
  eventId: z.string().min(1, 'eventId is required.'),
  eventTitle: z.string().optional().default(''),
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  rollNoDept: z.string().trim().min(3, 'Roll number / department is required.'),
  email: z.string().trim().email('A valid email address is required.'),
  phone: z.string().trim().optional().default(''),
  website: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    if (!rateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await req.json();

    // Honeypot: silently reject bots that fill the hidden field
    if (typeof body.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ success: true, message: 'Registration submitted successfully.' });
    }

    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { success: false, error: firstIssue ? firstIssue.message : 'Invalid input.' },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const events = getAll<any>('events');
    const eventExists = events.some((e: any) => e._id === data.eventId);
    if (!eventExists) {
      return NextResponse.json({ success: false, error: 'The selected event does not exist.' }, { status: 400 });
    }

    const registration = {
      eventId: data.eventId,
      eventTitle: data.eventTitle,
      name: data.name,
      rollNoDept: data.rollNoDept,
      email: data.email,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    };

    create('registrations', registration);

    return NextResponse.json({ success: true, message: 'Registration submitted successfully.' });
  } catch (err: any) {
    console.error('Failed to create registration:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

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
    console.error('Failed to delete registration:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const registrations = getAll<any>(
      'registrations',
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return NextResponse.json({ success: true, data: registrations });
  } catch (err: any) {
    console.error('Failed to fetch registrations:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
