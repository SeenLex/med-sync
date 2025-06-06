import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { fetchPaginatedAppointments } from "@/actions/appointments";
import AppointmentsTab from "@/components/profile/AppointmentsTab";

const ProfilePage = async () => {
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

  const initialData = await fetchPaginatedAppointments({ patientId, page: 1 });

  return <AppointmentsTab initialData={initialData} patientId={patientId} />;
};

export default ProfilePage;