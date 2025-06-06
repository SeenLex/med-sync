'use server';
import prisma from '@/prisma/db'
import { createClient } from '@/utils/supabase/server'

export async function fetchUser() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    const email = data.user?.email;
    if (!email) throw new Error("No email found in user data");

    const dbUser = await getUserByEmail(email);
    if (!dbUser) throw new Error('User not found in the database');
    
    return dbUser;
  } catch (error) {
    console.error('Error in fetchUser:', error);
    return null;
  }
}

export async function updateUser(id: string, formData: FormData) {
  await prisma.user.update({
    where: { id: Number(id) },
    data: {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string | null,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth") as string)
        : null,
      gender: formData.get("gender") as string | null,
      address: formData.get("address") as string | null,
    },
  });
}

export async function saveUser(formData: FormData) {
  const role = formData.get("role") as "PATIENT" | "DOCTOR" | "ADMIN";
  const createdUser = await prisma.user.create({
    data: {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      role: role,
      phone: formData.get("phone") ? (formData.get("phone") as string) : null,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth") as string)
        : null,
      gender: formData.get("gender") ? (formData.get("gender") as string) : null,
      address: formData.get("address") ? (formData.get("address") as string) : null,
    },
  });

  if (role === "PATIENT") {
    await prisma.patient.create({
      data: {
        userId: createdUser.id,
        pnc: formData.get("pnc") as string,
        insuranceInfo: formData.get("insuranceInfo") as string | null,
      },
    });
  }
  if (role === "DOCTOR") {
    const specialization = formData.get("specialization") as string;
    const licenseNumber = formData.get("licenseNumber") as string | null;
    if (!specialization) throw new Error("specialization is required for doctors");
    await prisma.doctor.create({
      data: {
        userId: createdUser.id,
        specialization,
        licenseNumber: licenseNumber && licenseNumber !== "" ? licenseNumber : null,
      },
    });
  }
}


export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id: Number(id) },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      patient: true,
      doctor: true,
    },
  });
}

export async function getDoctorUserByDoctorId(doctorId: string) {
  const doctorProfile = await prisma.doctor.findUnique({
    where: {
      id: Number(doctorId),
    },
  });

  if (!doctorProfile) {
    return null;
  }

  return getUserById(String(doctorProfile.userId));
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      patient: true,
      doctor: true,
    },
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      patient: true,
      doctor: true,
    },
  });
}


export async function getUserInfo(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      patient: true,
      doctor: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}



export async function getAllDoctors() {
  return await prisma.user.findMany({
    where: {
      role: "DOCTOR",
    },
    include: {
      doctor: true,
    },
  });
}

export type FindDoctor = Awaited<ReturnType<typeof getAllDoctors>>;
export type UserInfo = Awaited<ReturnType<typeof getUserInfo>>;

