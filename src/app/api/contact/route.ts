import { NextRequest, NextResponse } from 'next/server';
import { create } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rollNoDept, purpose } = body;

    if (!name || !rollNoDept || !purpose) {
      return NextResponse.json({ success: false, error: 'Name, roll number/department, and purpose are required.' }, { status: 400 });
    }

    const enquiry = {
      name: name.trim(),
      rollNoDept: rollNoDept.trim(),
      purpose: purpose.trim(),
      createdAt: new Date().toISOString(),
    };

    create('contact', enquiry);

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
