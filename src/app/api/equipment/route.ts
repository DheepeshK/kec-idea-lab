import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getAll, create } from '@/lib/store';

export async function GET() {
  try {
    const items = getAll('equipment', (a, b) => (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name));
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Failed to fetch equipment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const newItem = create('equipment', body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create equipment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 400 });
  }
}
