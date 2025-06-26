"use server";

import prisma from "@/prisma/db";
import { Role } from "@/prisma/generated/prisma";
import { fetchDoctorPatients, fetchPatientDoctors } from "./patients";
import { getUserInfo } from "./user";
import { revalidatePath } from "next/cache";

export async function getChatSessions(id: number, type: Role) {
    const chatSessions = await prisma.chatSession.findMany({
        where: {
            [type === "DOCTOR" ? "doctorId" : "patientId"]: id,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            patient: {
                include: {
                    user: true,
                },
            },
            doctor: {
                include: {
                    user: true,
                },
            },
        }
    });
    return chatSessions;
}


export async function createChatSession(doctorId: number, patientId: number) {
    const existingChatSession = await prisma.chatSession.findFirst({
        where: {
            OR: [
                { doctorId, patientId },
                { doctorId: patientId, patientId: doctorId },
            ],
        },
    });
    if (existingChatSession) {
        return existingChatSession;
    }

    return await prisma.chatSession.create({
        data: {
            doctorId,
            patientId,
        },
    });
}

export async function existsOrCreateAllChatSessions({
    doctorId = null,
    patientId = null,
}: {
    doctorId?: number | null;
    patientId?: number | null;
}) {
    if (doctorId === null && patientId === null) {
        return [];
    }
    
    if (doctorId) {
        const patients = await fetchDoctorPatients({ doctorId, page: -1 });
        for (const patient of patients.patients) {
            await createChatSession(doctorId, patient.id);
        }
        return await getChatSessions(doctorId, "DOCTOR");
    } else if (patientId) {
        const doctors = await fetchPatientDoctors({ patientId });
        for (const doctor of doctors.doctors) {
            await createChatSession(doctor.id, patientId);
        }
        return await getChatSessions(patientId, "PATIENT");
    }
}

export type ChatSession = NonNullable<Awaited<ReturnType<typeof existsOrCreateAllChatSessions>>>[0];

export type Revalidate = {
    path: string;
} | null;

export async function sendMessage(chatSessionId: number, content: string, userInfo: Awaited<ReturnType<typeof getUserInfo>>, options: { path?: string, fileName?: string, type?: string } = {}) {
    const chatSession = await prisma.chatSession.findUniqueOrThrow({
        where: {
            id: chatSessionId,
        },
    });
    if (!chatSession) {
        return null;
    }
    if (chatSession.doctorId !== userInfo.doctor?.id && chatSession.patientId !== userInfo.patient?.id) {
        throw new Error("You are not allowed to send messages to this chat session.");
    }
    if (options.type === "file") {
        const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".pdf"];
        const fileName = options.fileName || "";
        const ext = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
        if (!allowed.includes(ext)) {
            throw new Error("Only image files and PDFs are allowed.");
        }
        if (!content.startsWith("http")) {
            throw new Error("Invalid file URL.");
        }
        const message = await prisma.message.create({
            data: {
                chatSessionId,
                content,
                fileUrl: content,
                fileName: fileName,
                senderRole: userInfo.role,
                senderId: userInfo.id,
            },
        });
        if (options.path) {
            revalidatePath(options.path);
        }
        return message;
    }
    if (content.length === 0) {
        throw new Error("Message content cannot be empty.");
    }
    const message = await prisma.message.create({
        data: {
            chatSessionId,
            content,
            senderRole: userInfo.role,
            senderId: userInfo.id,
        },
    });
    if (options.path) {
        revalidatePath(options.path);
    }
    return message;
}