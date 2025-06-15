'use server';
import prisma from "@/prisma/db";

export async function getStats() {
    const users = await prisma.user.count()
    const doctors = await prisma.doctor.count()
    const patients = await prisma.patient.count()
    const appointments = await prisma.appointment.count()
    return {
        users,
        doctors,
        patients,
        appointments
    }
}

export type Stats = Awaited<ReturnType<typeof getStats>>;