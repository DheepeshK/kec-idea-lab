import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getAll, remove } from '@/lib/store';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const enquiries = getAll<any>(
      'contact',
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return NextResponse.json({ success: true, data: enquiries });
  } catch (err: any) {
    console.error('Failed to fetch contact enquiries:', err);
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
    const deleted = remove('contact', id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Enquiry not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Enquiry deleted.' });
  } catch (err: any) {
    console.error('Failed to delete contact enquiry:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
