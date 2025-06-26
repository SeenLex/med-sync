import { createClient } from "@/utils/supabase/server";
import React from "react";
import PatientDashboardPage from "../components/patients/PatientDashboardPage";
import LandingPage from "../components/landing/LandingPage";
import { getUserInfo } from "@/actions/user";
import { redirect } from "next/navigation";

const Homepage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user?.email) {
    return <LandingPage />;
  }

  const userInfo = await getUserInfo(user?.email);


  if (userInfo.role === "ADMIN") {
    redirect("/admin");
  }

  
  if (userInfo.role === "DOCTOR") {
    redirect("/dashboard/pending");
  }

  return <PatientDashboardPage />;
};

export default Homepage;