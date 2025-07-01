import { type ReactNode } from "react";
import Layout from "@/components/layout/DoctorLayout";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardNav } from "./DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
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

  return (
    <Layout withFooter={false}>
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <DashboardNav />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
} 