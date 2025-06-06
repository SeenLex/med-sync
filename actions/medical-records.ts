'use server';
import { MEDICAL_RECORDS_PAGE_SIZE } from '@/lib/constants';
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

export async function fetchPaginatedMedicalRecords({
  patientId,
  page = 1,
}: {
  patientId: number;
  page: number;
}) {
  const [totalCount, medicalRecords] = await prisma.$transaction([
    prisma.medicalRecord.count({ where: { patientId } }),
    prisma.medicalRecord.findMany({
      where: { patientId },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: MEDICAL_RECORDS_PAGE_SIZE,
      skip: (page - 1) * MEDICAL_RECORDS_PAGE_SIZE,
    }),
  ]);

  return { medicalRecords, totalCount };
}

export type MedicalRecord = Awaited<ReturnType<typeof fetchMedicalRecords>>[number];