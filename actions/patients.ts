'use server';
import prisma from "@/prisma/db";
import { MEDICAL_RECORDS_PAGE_SIZE } from "@/lib/constants";

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
    skip: (page - 1) * MEDICAL_RECORDS_PAGE_SIZE,
  });

  return { patients, totalCount };
}

export type DoctorPatient = Awaited<
  ReturnType<typeof fetchDoctorPatients>
>["patients"][number];