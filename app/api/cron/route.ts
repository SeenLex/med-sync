import { NextResponse } from 'next/server';
import prisma from '@/prisma/db';

export async function GET() {
    const appointments = await prisma.appointment.findMany({
        where: {
            status: "CONFIRMED",
            endTime: {
                lt: new Date()
            }
        }
    })
    
    for (const appointment of appointments) {
        await prisma.appointment.update({
            where: { id: appointment.id },
            data: { status: "COMPLETED" }
        })
    }

  return NextResponse.json({ ok: true });
}