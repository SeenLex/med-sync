import { NextResponse } from 'next/server';

export async function GET() {
    const appointments = await prisma.appointment.findMany({
        where: {
            status: "confirmed",
            date: {
                lt: new Date()
            }
        }
    })
    
    for (const appointment of appointments) {
        await prisma.appointment.update({
            where: { id: appointment.id },
            data: { status: "completed" }
        })
    }

  return NextResponse.json({ ok: true });
}