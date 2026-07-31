import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getAll, create } from '@/lib/store';

export async function GET() {
  try {
    const items = getAll('events');
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const newItem = create('events', body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create event:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 400 });
  }
}
