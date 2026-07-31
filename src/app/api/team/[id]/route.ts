import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { update, remove } from '@/lib/store';

interface RouteParams {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const updated = update('team', params.id, body);
    if (!updated) return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Failed to update team member:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const ok = remove('team', params.id);
    if (!ok) return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { id: params.id } });
  } catch (error: any) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 400 });
  }
}
