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

export async function fetchDoctorAppointmentsForDate(doctorId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return await prisma.appointment.findMany({
    where: { doctorId: Number(doctorId), startTime: { gte: startOfDay, lte: endOfDay } },
  });
}

interface BookAppointment{
  patientId: number;
  doctorId: number;
  startTime: Date;
  endTime: Date;
  type: 'IN_PERSON' | 'VIRTUAL';
  notes?: string | null;
}

export async function bookAppointment(input: BookAppointment) {
  return await prisma.appointment.create({
    data: {
      patientId: input.patientId,
      doctorId: input.doctorId,
      startTime: input.startTime,
      endTime: input.endTime,
      type: input.type,
      notes: input.notes || null,
    },
  });
}

export type Appointment = Awaited<ReturnType<typeof fetchAppointments>>[number];