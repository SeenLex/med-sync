import { getAllUsers } from "@/actions/user";
import { getStats } from "@/actions/stats";
import AdminDashboard from "./AdminDashboard";
import { getAllAppointments } from "@/actions/appointments";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
        return <div>Please log in to view this page.</div>;
    }
    const userInfo = await getUserInfo(user.email);
    if (userInfo.role !== "ADMIN") {
        return <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">Access Denied. You are not an admin.</div>;
    }
    const [users, stats, appointments] = await Promise.all([
        getAllUsers(),
        getStats(),
        getAllAppointments()
    ])
    return <AdminDashboard allUsers={users} stats={stats} appointments={appointments} userInfo={userInfo}/>;
}