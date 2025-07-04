'use server';
import prisma from "@/prisma/db";
import { APPOINTMENTS_PAGE_SIZE } from "@/lib/constants";
import { AppointmentStatus } from "@/prisma/generated/prisma";
import { createZoomMeeting } from "@/utils/zoom/meeting";

export async function fetchPaginatedAppointments({
  patientId,
  page = 1,
}: {
  patientId: number;
  page: number;
}) {
  const [totalCount, appointments] = await prisma.$transaction([
    prisma.appointment.count({ where: { patientId } }),
    prisma.appointment.findMany({
      where: { patientId },
      include: {
        doctor: {
          include: {
            user: true,
            specialty: true,
          },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { startTime: "desc" },
      take: APPOINTMENTS_PAGE_SIZE,
      skip: (page - 1) * APPOINTMENTS_PAGE_SIZE,
    }),
  ]);

  return { appointments, totalCount };
}

export type AppointmentWithDoctor = Awaited<ReturnType<typeof fetchPaginatedAppointments>>['appointments'][number];

export async function getAllAppointments() {
  return await prisma.appointment.findMany();
}

export async function fetchPaginatedDoctorAppointments({
  doctorId,
  page = 1,
}: {
  doctorId: number;
  page: number;
}) {
  const whereClause = {
    doctorId,
    startTime: { gt: new Date() },
  };

  const [totalCount, appointments] = await prisma.$transaction([
    prisma.appointment.count({ where: whereClause }),
    prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { startTime: "asc" },
      take: APPOINTMENTS_PAGE_SIZE,
      skip: (page - 1) * APPOINTMENTS_PAGE_SIZE,
    }),
  ]);

  return { appointments, totalCount };
}

export async function fetchPendingDoctorAppointments({
  doctorId,
  page = 1,
}: {
  doctorId: number;
  page: number;
}) {
  const whereClause = {
    doctorId,
    status: "PENDING" as AppointmentStatus,
  };

  const [totalCount, appointments] = await prisma.$transaction([
    prisma.appointment.count({ where: whereClause }),
    prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { startTime: "asc" },
      take: APPOINTMENTS_PAGE_SIZE,
      skip: (page - 1) * APPOINTMENTS_PAGE_SIZE,
    }),
  ]);

  return { appointments, totalCount };
}

export async function confirmAppointment(appointmentId: number) {
  const zoomMeeting = await createZoomMeeting();
  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CONFIRMED", meetingLink: zoomMeeting },
    include: {
      doctor: {
        include: {
          user: true,
        },
      },
      patient: {
        include: {
          user: true,
        },
      },
    }
  });
}

export async function declineAppointment(appointmentId: number) {
  return await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CANCELED" },
  });
}

export async function fetchPaginatedUpcomingAppointments({
  patientId,
  page = 1,
}: {
  patientId: number;
  page: number;
}) {
  const now = new Date();

  const upcomingStatuses: AppointmentStatus[] = ["CONFIRMED"];

  const whereClause = {
    patientId,
    status: { in: upcomingStatuses },
    startTime: { gt: now },
  };

  const [totalCount, appointments] = await prisma.$transaction([
    prisma.appointment.count({ where: whereClause }),
    prisma.appointment.findMany({
      where: whereClause,
      include: {
        doctor: {
          include: {
            user: true,
            specialty: true,
          },
        },
      },
      orderBy: { startTime: "asc" },
      take: APPOINTMENTS_PAGE_SIZE,
      skip: (page - 1) * APPOINTMENTS_PAGE_SIZE,
    }),
  ]);

  return { appointments, totalCount };
}

export type UpcomingAppointment = Awaited<ReturnType<typeof fetchPaginatedUpcomingAppointments>>['appointments'][number];

export async function fetchAppointments(patientId: number) {
  return await prisma.appointment.findMany({
    where: { patientId },
    include: {
      doctor: {
        include: { user: true },
      },
      patient: {
        include: {
          user: true,
        },
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

interface BookAppointment {
  patientId: number;
  doctorId: number;
  startTime: Date;
  endTime: Date;
  type: 'IN_PERSON' | 'VIRTUAL';
  notes?: string | null;
}

export async function bookAppointment(input: BookAppointment) {
  const existing = await prisma.appointment.findFirst({
    where: {
      patientId: input.patientId,
      startTime: input.startTime,
      status: { not: "CANCELED" },
    },
  });
  if (existing) {
    throw new Error("You already have an appointment at this time.");
  }
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

export async function cancelAppointment(appointmentId: number) {
  return await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CANCELED" },

    include: {
      doctor: {
        include: {
          user: true,
        },
      },
    },
  });
}

export type Appointment = Awaited<ReturnType<typeof fetchAppointments>>[number];