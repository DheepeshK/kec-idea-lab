import { NextRequest, NextResponse } from 'next/server';
import { update, remove } from '@/lib/store';

interface RouteParams { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const body = await req.json();
    const updated = update('calendar', params.id, body);
    if (!updated) return NextResponse.json({ success: false, error: 'Calendar entry not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const ok = remove('calendar', params.id);
    if (!ok) return NextResponse.json({ success: false, error: 'Calendar entry not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { id: params.id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
