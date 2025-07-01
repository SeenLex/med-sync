import NewAppointment from "./NewAppointment";
import {
  getAllDoctors,
  getUserInfo,
  getDoctorUserByDoctorId,
  getAllSpecialties,
} from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { redirect } from "next/navigation";
import { FindDoctor } from "@/actions/user";
export const dynamic = "force-dynamic";

const NewAppointmentFlowPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const userInfo = await getUserInfo(user.email);
  const doctors = await getAllDoctors();
  const specialties = await getAllSpecialties();

  if (!doctors || !userInfo?.patient?.id) {
    return <div>Error loading page data.</div>;
  }

  const [action, doctorId] = (await params).slug || [];
  const { type } = await searchParams;
  
  let doctorToReschedule: FindDoctor[number] | null = null;

  if (action === "reschedule" && doctorId) {
    const doctorProfile = await getDoctorUserByDoctorId(doctorId);
    if (doctorProfile) {
      const { user, ...doctorWithoutUser } = doctorProfile;
      doctorToReschedule = {
        ...user,
        doctor: {
          ...doctorWithoutUser,
        },
      };
    }
  }

  const initialType: "IN_PERSON" | "VIRTUAL" | null =
    type === "IN_PERSON" || type === "VIRTUAL" ? type : null;

  return (
    <>
      {userInfo && (
        <NewAppointment
          userInfo={userInfo}
          doctors={doctors}
          doctorToReschedule={doctorToReschedule}
          initialType={initialType}
          specialties={specialties}
        />
      )}
    </>
  );
};

export default NewAppointmentFlowPage;