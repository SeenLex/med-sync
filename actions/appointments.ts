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

interface BookAppointment{
  patientId: number;
  doctorId: number;
  startTime: Date;
  endTime: Date;
  type: 'IN_PERSON' | 'VIRTUAL';
  status: 'PENDING';
}

export async function bookAppointment(input: BookAppointment) {
  return await prisma.appointment.create({
    data: {
      patientId: input.patientId,
      doctorId: input.doctorId,
      startTime: input.startTime,
      endTime: input.endTime,
      type: input.type,
    },
  });
}

export type Appointment = Awaited<ReturnType<typeof fetchAppointments>>[number];