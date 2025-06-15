import { getAllUsers } from "@/actions/user";
import { getStats } from "@/actions/stats";
import AdminDashboard from "./AdminDashboard";
import { getAllAppointments } from "@/actions/appointments";

export default async function AdminPage() {
    const [users, stats, appointments] = await Promise.all([
        getAllUsers(),
        getStats(),
        getAllAppointments()
    ])
    return <AdminDashboard allUsers={users} stats={stats} appointments={appointments}/>
}