import { fetchPaginatedUpcomingAppointments } from "@/actions/appointments";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import Homepage from "./Homepage";

const HomeAppointments = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return (
      <Homepage
        initialData={{ appointments: [], totalCount: 0 }}
        patientId={0}
      />
    );
  }

  const userInfo = await getUserInfo(user.email);
  const patientId = userInfo.patient?.id;
  if (!patientId) {
    return (
      <Homepage
        initialData={{ appointments: [], totalCount: 0 }}
        patientId={0}
      />
    );
  }

  const initialData = await fetchPaginatedUpcomingAppointments({
    patientId,
    page: 1,
  });

  return <Homepage initialData={initialData} patientId={patientId} />;
};

export default HomeAppointments;