import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import DoctorDashboard from "./DoctorDashboard";
import { redirect } from "next/navigation";

const DoctorDashboardPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const userInfo = await getUserInfo(user.email);

  if (userInfo.role !== "DOCTOR" || !userInfo.doctor) {
    return (
      <div className="flex items-center justify-center h-screen">
        Access Denied. You are not registered as a doctor.
      </div>
    );
  }

  return <DoctorDashboard userInfo={userInfo} />;
};

export default DoctorDashboardPage;
