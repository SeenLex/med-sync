'use server';
import prisma from '@/prisma/db';

export async function fetchMedicalRecords(patientId: number) {
  return await prisma.medicalRecord.findMany({
    where: { patientId },
    include: {
      doctor: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export type MedicalRecord = Awaited<ReturnType<typeof fetchMedicalRecords>>[number];