import NewAppointment from "./NewAppointment";
import {
  getAllDoctors,
  getUserInfo,
  getDoctorUserByDoctorId,
} from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { redirect } from "next/navigation";
import { FindDoctor } from "@/actions/user";

//
// THIS IS THE DEFINITIVE FIX to silence the linter warning.
// It explicitly tells Next.js that this entire page should always be
// rendered dynamically at request time.
//
export const dynamic = "force-dynamic";

const NewAppointmentFlowPage = async ({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // The rest of your code is perfect and does not need to change.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const userInfo = await getUserInfo(user.email);
  const doctors = await getAllDoctors();

  if (!doctors || !userInfo?.patient?.id) {
    return <div>Error loading page data.</div>;
  }

  const [action, doctorId] = params.slug || [];
  const type = searchParams?.type;

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
    />
  );
};

export default NewAppointmentFlowPage;