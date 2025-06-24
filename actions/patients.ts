'use server';
import prisma from "@/prisma/db";
import { MEDICAL_RECORDS_PAGE_SIZE } from "@/lib/constants";

export async function getPatient(id: number) {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      user: true,
      medicalRecords: true,
    },
  });
  return patient;
}

export type Patient = Awaited<
  ReturnType<typeof getPatient>
>;

export async function fetchDoctorPatients({
  doctorId,
  page = 1,
}: {
  doctorId: number;
  page: number;
}) {
  const distinctPatientAppointments = await prisma.appointment.findMany({
    where: { doctorId },
    select: {
      patientId: true,
    },
    distinct: ["patientId"],
  });

  const totalCount = distinctPatientAppointments.length;

  const patientIds = distinctPatientAppointments.map((appt) => appt.patientId);

  const patients = await prisma.patient.findMany({
    where: {
      id: {
        in: patientIds,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      user: {
        fullName: "asc",
      },
    },
    ...(page !== -1 && {
      skip: (page - 1) * MEDICAL_RECORDS_PAGE_SIZE,
      take: MEDICAL_RECORDS_PAGE_SIZE,
    }),
  });

  return { patients, totalCount };
}

export async function fetchPatientDoctors({ patientId }: { patientId: number}) {
  const doctors = await prisma.doctor.findMany({
    where: {
      appointments: { some: { patientId } },
    },
    include: {
      user: true,
      specialty: true,
    },
  });

  return { doctors };
}

export type DoctorPatient = Awaited<
  ReturnType<typeof fetchDoctorPatients>
>["patients"][number];