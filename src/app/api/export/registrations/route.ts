import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getAll } from '@/lib/store';
import ExcelJS from 'exceljs';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    const registrations = getAll<any>('registrations', (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const events = getAll<any>('events');

    const workbook = new ExcelJS.Workbook();

    if (eventId) {
      const event = events.find((e: any) => e._id === eventId);
      const eventRegs = registrations.filter((r: any) => r.eventId === eventId);
      addSheet(workbook, event?.title || eventId, eventRegs);
    } else {
      const grouped: Record<string, any[]> = {};
      for (const reg of registrations) {
        if (!grouped[reg.eventId]) grouped[reg.eventId] = [];
        grouped[reg.eventId].push(reg);
      }
      for (const [eid, regs] of Object.entries(grouped)) {
        const event = events.find((e: any) => e._id === eid);
        addSheet(workbook, event?.title || eid, regs);
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="registrations${eventId ? `-${eventId}` : ''}.xlsx"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

function addSheet(workbook: ExcelJS.Workbook, title: string, regs: any[]) {
  const safeTitle = title.replace(/[\\\/\?\*\[\]]/g, '').slice(0, 31);
  const sheet = workbook.addWorksheet(safeTitle || 'Registrations');

  sheet.columns = [
    { header: 'Name', key: 'name', width: 28 },
    { header: 'Roll No / Dept', key: 'rollNoDept', width: 22 },
    { header: 'Email', key: 'email', width: 34 },
    { header: 'Phone', key: 'phone', width: 18 },
    { header: 'Registered At', key: 'createdAt', width: 22 },
  ];

  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFD2232A' },
  };

  for (const reg of regs) {
    sheet.addRow({
      name: reg.name,
      rollNoDept: reg.rollNoDept,
      email: reg.email,
      phone: reg.phone || '',
      createdAt: new Date(reg.createdAt).toLocaleString('en-IN'),
    });
  }
}
