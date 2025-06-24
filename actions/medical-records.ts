'use server';
import { MEDICAL_RECORDS_PAGE_SIZE } from '@/lib/constants';
import prisma from '@/prisma/db';
import { RecordType } from '@/prisma/generated/prisma';
import { createClient } from '@/utils/supabase/server';
import { Revalidate } from './chat';
import { revalidatePath } from 'next/cache';

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
            specialty: true,
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

export async function uploadFile(file: File, bucket: string) {
  const supabase = await createClient();
  const fileName = `medical-record-${file.name}-${Date.now()}`;
  
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
  
  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
  
  if (!data?.path) {
    throw new Error('Upload succeeded but no file path returned');
  }

  return data.path;
}

export async function deleteFile(fileUrl: string) {
  const supabase = await createClient();
  const { error } = await supabase.storage.from('medical-records').remove([fileUrl]);
  if (error) {
    throw new Error('Failed to delete file');
  }
}

const RECORD_TYPE_INFO = {
  [RecordType.LAB_RESULT]: {
    title: 'LAB_RESULT',
    description: 'Lab result',
  },
  [RecordType.PRESCRIPTION]: {
    title: 'PRESCRIPTION',
    description: 'Prescription',
  },
  [RecordType.VISIT_SUMMARY]: {
    title: 'VISIT_SUMMARY',
    description: 'Visit summary',
  },
  [RecordType.MEDICAL_HISTORY]: {
    title: 'MEDICAL_HISTORY',
    description: 'Medical history',
  },
  [RecordType.OTHER]: {
    title: 'OTHER',
    description: 'Other',
  },
}

export async function uploadMedicalRecord(patientId: number, file: File, type: RecordType, doctorId: number, revalidate: Revalidate = null) {
  const fileUrl = await uploadFile(file, 'medical-records');
  await prisma.medicalRecord.create({
    data: { patientId, title: RECORD_TYPE_INFO[type].title, description: RECORD_TYPE_INFO[type].description, type, doctorId, fileUrl },
  });
  if (revalidate) {
    revalidatePath(revalidate.path);
  }
}

export async function deleteMedicalRecord(id: number) {
  const medicalRecord = await prisma.medicalRecord.findUnique({ where: { id } });
  if (!medicalRecord) {
    throw new Error('Medical record not found');
  }
  if (medicalRecord.fileUrl) {
    await deleteFile(medicalRecord.fileUrl);
  }
  return await prisma.medicalRecord.delete({ where: { id } });
}

export async function downloadFile(fileUrl: string, bucket: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucket).download(fileUrl);
  if (error) {
    console.error('Download error:', error);
    throw new Error(`Failed to download file: ${error.message}`);
  }
  return data;
}

export async function downloadMedicalRecord(fileUrl: string) {
  return await downloadFile(fileUrl, 'medical-records');
}