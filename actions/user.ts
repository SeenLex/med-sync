'use server'
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

export async function saveUser(formData: FormData) {
  const role = formData.get("role") as "PATIENT" | "DOCTOR" | "ADMIN";

  await prisma.user.create({
    data: {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      role: role,
      contactNumber: formData.get("contactNumber") as string | null,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth") as string)
        : null,
      gender: formData.get("gender") as string | null,
      address: formData.get("address") as string | null,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      patient: true,
      doctor: true,
      admin: true,
    },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      patient: true,
      doctor: true,
      admin: true,
    },
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      patient: true,
      doctor: true,
      admin: true,
    },
  });
}

export async function updateUser(id: string, formData: FormData) {
  const role = formData.get("role") as "PATIENT" | "DOCTOR" | "ADMIN";

  await prisma.user.update({
    where: { id: Number(id) },
    data: {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      role: role,
      contactNumber: formData.get("contactNumber") as string | null,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth") as string)
        : null,
      gender: formData.get("gender") as string | null,
      address: formData.get("address") as string | null,
    },
    include: {
      patient: true,
      doctor: true,
      admin: true,
    },
  });
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id: Number(id) },
  });
}

export async function getUserInfo(id: string) {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      patient: true,
      doctor: true,
      admin: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
