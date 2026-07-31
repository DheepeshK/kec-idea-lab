import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { create } from '@/lib/store';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  rollNoDept: z.string().trim().min(3, 'Roll number / department is required.'),
  purpose: z.string().trim().min(10, 'Please specify your purpose in at least 10 characters.'),
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
      return NextResponse.json({ success: true, message: 'Enquiry submitted successfully.' });
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { success: false, error: firstIssue ? firstIssue.message : 'Invalid input.' },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const enquiry = {
      name: data.name,
      rollNoDept: data.rollNoDept,
      purpose: data.purpose,
      createdAt: new Date().toISOString(),
    };

    create('contact', enquiry);

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully.' });
  } catch (err: any) {
    console.error('Failed to create enquiry:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
