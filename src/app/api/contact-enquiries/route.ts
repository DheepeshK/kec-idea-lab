import { NextRequest, NextResponse } from 'next/server';
import { getAll, remove } from '@/lib/store';

export async function GET() {
  try {
    const enquiries = getAll<any>(
      'contact',
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return NextResponse.json({ success: true, data: enquiries });
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
    const deleted = remove('contact', id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Enquiry not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Enquiry deleted.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
