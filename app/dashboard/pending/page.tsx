import PendingAppointmentsList from "@/components/doctor-dashboard/PendingAppointmentsList";
import Card from "@/components/ui/Card";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";

const PendingAppointmentsPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const userInfo = await getUserInfo(user.email);

  if (!userInfo.doctor) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pending Appointments</h1>
      </div>
      <Card className="p-6">
        <PendingAppointmentsList doctorId={userInfo.doctor.id} />
      </Card>
    </>
  );
};

export default PendingAppointmentsPage; 