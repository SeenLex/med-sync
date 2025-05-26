'use server';
import prisma from "@/prisma/db";

export async function fetchAppointments(patientId: number) {
  return await prisma.appointment.findMany({
    where: { patientId },
    include: {
      doctor: {
        include: { user: true },
      },
    },
    orderBy: { startTime: "desc" },
  });
}

export type Appointment = Awaited<ReturnType<typeof fetchAppointments>>[number];