import NewAppointment from "./NewAppointment";
import {
  getAllDoctors,
  getUserInfo,
  getDoctorUserByDoctorId,
  getAllSpecializations,
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
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
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
  const specialties = await getAllSpecializations();

  if (!doctors || !userInfo?.patient?.id) {
    return <div>Error loading page data.</div>;
  }

  const [action, doctorId] = params.slug || [];
  const { type } = await searchParams;

  let doctorToReschedule: FindDoctor[number] | null = null;

  if (action === "reschedule" && doctorId) {
    doctorToReschedule = await getDoctorUserByDoctorId(doctorId);
  }

  const initialType: "IN_PERSON" | "VIRTUAL" | null =
    type === "IN_PERSON" || type === "VIRTUAL" ? type : null;

  return (
    <NewAppointment
      userInfo={userInfo}
      doctors={doctors}
      doctorToReschedule={doctorToReschedule}
      initialType={initialType}
      specialties={specialties}
    />
  );
};

export default NewAppointmentFlowPage;