'use server';
import prisma from '@/prisma/db'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache';

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
  const currentUser = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: { fullName: true, email: true },
  });

  if (!currentUser) throw new Error('User not found');

  const fullNameFromForm = formData.get("fullName");
  const fullName = (typeof fullNameFromForm === 'string' && fullNameFromForm.trim() !== '')
    ? fullNameFromForm
    : currentUser.fullName;

  const emailFromForm = formData.get("email");
  const email = (typeof emailFromForm === 'string' && emailFromForm.trim() !== '')
    ? emailFromForm
    : currentUser.email;

  await prisma.user.update({
    where: { id: Number(id) },
    data: {
      fullName,
      email,
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
      profileImage: formData.get("profileImage") ? (formData.get("profileImage") as string) : null,
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
    const specialtyId = Number(formData.get("specialtyId"));
    const licenseNumber = formData.get("licenseNumber") as string | null;
    if (!specialtyId) throw new Error("specialtyId is required for doctors");
    await prisma.doctor.create({
      data: {
        userId: createdUser.id,
        specialtyId,
        licenseNumber: licenseNumber && licenseNumber !== "" ? licenseNumber : null,
      },
    });
  }
}


export async function deleteUser(id: string, withRevalidate: boolean = false, pathName: string = "") {
  await prisma.user.delete({
    where: { id: Number(id) },
  });

  if (withRevalidate) {
    revalidatePath(pathName);
  }
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
    include: {
      specialty: true,
      user: true,
    },
  });

  if (!doctorProfile) {
    return null;
  }

  return doctorProfile;
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
      doctor: {
        include: { specialty: true },
      },
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
      doctor: {
        include: { specialty: true },
      },
    },
  });
}

export type FindDoctor = Awaited<ReturnType<typeof getAllDoctors>>;
export type UserInfo = Awaited<ReturnType<typeof getUserInfo>>;

// Fetch all specialties from the Specialty table
export async function getAllSpecialties() {
  const specialties: { name: string }[] = await prisma.specialty.findMany({
    orderBy: { name: "asc" },
  });
  return specialties.map((s) => s.name);
}

// Fetch all specialties as { value, label } for dropdowns
export async function getAllSpecialtyOptions() {
  const specialties: { id: number, name: string }[] = await prisma.specialty.findMany({
    orderBy: { name: "asc" },
  });
  return specialties.map((s) => ({ value: s.id.toString(), label: s.name }));
}

export async function uploadProfilePicture(file: File, userId: string) {
  const supabase = await createClient();
  const { data: existingFiles } = await supabase.storage
    .from('profile-pictures')
    .list(userId);
  if (existingFiles && existingFiles.length > 0) {
    const filesToDelete = existingFiles
      .filter(file => file.name.startsWith('profile.'))
      .map(file => `${userId}/${file.name}`);
    if (filesToDelete.length > 0) {
      await supabase.storage.from('profile-pictures').remove(filesToDelete);
    }
  }
  const fileExtension = file.name.split('.').pop();
  const fileName = `${userId}/profile.${fileExtension}`;
  const { data, error } = await supabase.storage
    .from('profile-pictures')
    .upload(fileName, file, {
      upsert: true
    });
  if (error) {
    console.error('Profile picture upload error:', error);
    throw new Error(`Failed to upload profile picture: ${error.message}`);
  }
  if (!data?.path) {
    throw new Error('Upload succeeded but no file path returned');
  }
  return data.path;
}

export async function getProfilePictureUrl(userId: string): Promise<string | null> {
  const supabase = await createClient();
  
  const { data } = await supabase.storage
    .from('profile-pictures')
    .list(userId);
  
  if (data && data.length > 0) {
    const profileFile = data.find(file => file.name.startsWith('profile.'));
    if (profileFile) {
      const { data: urlData } = await supabase.storage
        .from('profile-pictures')
        .getPublicUrl(`${userId}/${profileFile.name}`);
      
      return urlData.publicUrl;
    }
  }
  
  return null;
}

export async function deleteProfilePicture(userId: string) {
  const supabase = await createClient();
  
  const { data } = await supabase.storage
    .from('profile-pictures')
    .list(userId);
  
  if (data && data.length > 0) {
    const filesToDelete = data
      .filter(file => file.name.startsWith('profile.'))
      .map(file => `${userId}/${file.name}`);
    
    if (filesToDelete.length > 0) {
      const { error } = await supabase.storage
        .from('profile-pictures')
        .remove(filesToDelete);
      
      if (error) {
        console.error('Profile picture deletion error:', error);
        throw new Error(`Failed to delete profile picture: ${error.message}`);
      }
    }
  }
}

export async function updateUserProfileImage(id: string, imageUrl: string) {
  try {
    console.log('Updating user profile image:', { id, imageUrl });
    await prisma.user.update({
      where: { id: Number(id) },
      data: { profileImage: imageUrl },
    });
    console.log('Profile image updated successfully');
  } catch (error) {
    console.error('Failed to update user profile image:', error);
    throw error;
  }
}

