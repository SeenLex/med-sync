import { fetchAppointments } from "@/actions/appointments";
import { getUserInfo } from "@/actions/user";
import AppointmentsTab from "@/components/profile/AppointmentsTab";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return <div>Please log in to view your profile.</div>;
  }

  const userInfo = await getUserInfo(user.email);
  const patientId = userInfo.patient?.id;
  if (!patientId) {
    return <div>No patient information found.</div>;
  }
  const appointments = await fetchAppointments(patientId);
  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex justify-center pt-16 text-gray-700 text-xl">
        No appointments found.
      </div>
    );
  }
  return <AppointmentsTab all={appointments} page={1} setPage={() => {}} />;
};

export default page;
