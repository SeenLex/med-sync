import NewAppointment from "./NewAppointment";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const NewAppointmentPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return <div>Please log in to view your profile.</div>;
  }
  const userInfo = await getUserInfo(user.email);
  if (!userInfo?.patient?.id) return;
  return <NewAppointment userInfo={userInfo} />;
};

export default NewAppointmentPage;
